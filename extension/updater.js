/**
 * ============================================================================
 * BỘ CẬP NHẬT TỰ ĐỘNG (AUTO-UPDATER) - TẠO ARTBOARD & LƯỚI BAO BÌ PRO
 * ----------------------------------------------------------------------------
 * - Mỗi lần mở Panel: tải version.json từ GitHub, so sánh với APP_VERSION.
 * - Nếu có bản mới: hiện nút "🔔 Cập nhật" + ghi chú thay đổi.
 * - Bấm "Cập nhật ngay": tải toàn bộ file mới về bộ nhớ -> ghi đè vào thư mục
 *   Extension -> tải lại Panel. Không cần cài lại.
 * ============================================================================
 */

// ⚠️ Dòng dưới được công cụ PHAT_HANH tự cập nhật - không sửa tay.
const APP_VERSION = "2.1.0";

const UPDATE_REPO_RAW = "https://raw.githubusercontent.com/lkey124/panel-bao-b-/main/";
const UPDATE_MANIFEST_URL = UPDATE_REPO_RAW + "version.json";

const Updater = (() => {
  let remoteInfo = null;

  // Lấy module Node.js trong môi trường CEP
  function nodeRequire(name) {
    try {
      if (window.cep_node && typeof window.cep_node.require === "function") return window.cep_node.require(name);
    } catch (_) {}
    try {
      if (typeof require === "function") return require(name);
    } catch (_) {}
    return null;
  }

  // So sánh phiên bản dạng 2.1.10 > 2.1.9
  function compareVersion(a, b) {
    const pa = String(a).split(".").map((n) => parseInt(n, 10) || 0);
    const pb = String(b).split(".").map((n) => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const d = (pa[i] || 0) - (pb[i] || 0);
      if (d !== 0) return d > 0 ? 1 : -1;
    }
    return 0;
  }

  function bust(url) {
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "t=" + Date.now();
  }

  // Tải dữ liệu nhị phân: ưu tiên Node https (không vướng CORS), dự phòng fetch
  function download(url, redirectsLeft = 5) {
    const https = nodeRequire("https");
    if (!https) {
      return fetch(bust(url), { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.arrayBuffer().then((ab) => new Uint8Array(ab));
      });
    }
    return new Promise((resolve, reject) => {
      const req = https.get(bust(url), { headers: { "User-Agent": "BaoBiPanel-Updater", "Cache-Control": "no-cache" } }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
          res.resume();
          resolve(download(res.headers.location, redirectsLeft - 1));
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error("HTTP " + res.statusCode + " - " + url));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      });
      req.setTimeout(20000, () => req.destroy(new Error("Hết thời gian chờ mạng")));
      req.on("error", reject);
    });
  }

  function downloadText(url) {
    return download(url).then((buf) => {
      let s = typeof Buffer !== "undefined" && Buffer.isBuffer(buf) ? buf.toString("utf8") : new TextDecoder("utf-8").decode(buf);
      return s.replace(/^\uFEFF/, "");
    });
  }

  function getExtensionDir() {
    let p = "";
    try {
      p = csInterface.getSystemPath(SystemPath.EXTENSION);
    } catch (_) {}
    p = decodeURI(String(p || "")).replace(/^file:\/{2,3}/i, "");
    const path = nodeRequire("path");
    return path ? path.normalize(p) : p;
  }

  function el(id) {
    return document.getElementById(id);
  }

  function showUpdateAvailable(info) {
    el("btnUpdate").textContent = "🔔 Cập nhật v" + info.version;
    el("btnUpdate").classList.remove("hidden");
    el("updateTitle").textContent = "Có phiên bản mới v" + info.version + "  (đang dùng v" + APP_VERSION + ")";
    el("updateNotes").textContent = info.notes || "Cải thiện và sửa lỗi.";
    el("updateProgress").textContent = "";
  }

  function check(manual = false) {
    if (manual) setStatus("Đang kiểm tra cập nhật...");
    return downloadText(UPDATE_MANIFEST_URL)
      .then((txt) => {
        const info = JSON.parse(txt);
        if (info && info.version && compareVersion(info.version, APP_VERSION) > 0) {
          remoteInfo = info;
          showUpdateAvailable(info);
          if (manual) el("updateBox").classList.remove("hidden");
        } else if (manual) {
          setStatus("✓ Bạn đang dùng bản mới nhất (v" + APP_VERSION + ")");
        }
      })
      .catch((e) => {
        if (manual) setStatus("Không kiểm tra được cập nhật: " + e.message, true);
      });
  }

  // Ghi đè thêm file Script vào menu File > Scripts (nếu có quyền ghi)
  function updateScriptMenuCopy(fs, path, scriptBuf) {
    return new Promise((resolve) => {
      if (!scriptBuf) return resolve(0);
      csInterface.evalScript("Folder(app.path).fsName", (appPath) => {
        let count = 0;
        try {
          // app.path = ...\Adobe Illustrator 20xx\Support Files\Contents\Windows
          const aiRoot = path.resolve(String(appPath), "..", "..", "..");
          const presets = path.join(aiRoot, "Presets");
          if (fs.existsSync(presets)) {
            fs.readdirSync(presets).forEach((loc) => {
              const sd = path.join(presets, loc, "Scripts");
              const target = path.join(sd, "Tao_Artboard_Va_Luoi_BaoBi.jsx");
              try {
                if (fs.existsSync(target)) {
                  fs.writeFileSync(target, scriptBuf);
                  count++;
                }
              } catch (_) {}
            });
          }
        } catch (_) {}
        resolve(count);
      });
    });
  }

  async function install() {
    if (!remoteInfo) return;
    const fs = nodeRequire("fs");
    const path = nodeRequire("path");
    if (!fs || !path) {
      setStatus("Panel không hỗ trợ tự cập nhật. Hãy tải bộ cài mới trên GitHub.", true);
      return;
    }

    const btn = el("btnUpdateNow");
    const prog = el("updateProgress");
    btn.disabled = true;
    el("btnUpdate").disabled = true;

    const files = Array.isArray(remoteInfo.files) ? remoteInfo.files : [];
    const extDir = getExtensionDir();
    if (!extDir || !fs.existsSync(extDir) || files.length === 0) {
      prog.textContent = "Lỗi: không xác định được thư mục cài đặt.";
      btn.disabled = false;
      return;
    }

    try {
      // B1: Tải TẤT CẢ file vào bộ nhớ trước (lỗi giữa chừng không làm hỏng bản đang dùng)
      const buffers = {};
      for (let i = 0; i < files.length; i++) {
        prog.textContent = `Đang tải ${i + 1}/${files.length}: ${files[i]}`;
        buffers[files[i]] = await download(UPDATE_REPO_RAW + "extension/" + files[i]);
      }
      let scriptBuf = null;
      if (remoteInfo.script) {
        try {
          prog.textContent = "Đang tải Script...";
          scriptBuf = await download(UPDATE_REPO_RAW + remoteInfo.script);
        } catch (_) {}
      }

      // B2: Ghi đè vào thư mục Extension
      prog.textContent = "Đang cài đặt...";
      files.forEach((rel) => {
        const target = path.join(extDir, rel.split("/").join(path.sep));
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, buffers[rel]);
      });
      await updateScriptMenuCopy(fs, path, scriptBuf);

      // B3: Hoàn tất
      if (remoteInfo.restartRequired) {
        prog.textContent = "✓ Đã cập nhật v" + remoteInfo.version + ". Hãy KHỞI ĐỘNG LẠI Illustrator để áp dụng.";
        setStatus("✓ Cập nhật xong - khởi động lại Illustrator");
      } else {
        prog.textContent = "✓ Đã cập nhật v" + remoteInfo.version + ". Đang tải lại...";
        setTimeout(() => location.reload(), 900);
      }
    } catch (e) {
      prog.textContent = "Lỗi cập nhật: " + e.message + " (bản đang dùng vẫn giữ nguyên)";
      btn.disabled = false;
      el("btnUpdate").disabled = false;
    }
  }

  function init() {
    el("lblVersion").textContent = "v" + APP_VERSION;
    el("lblVersion").addEventListener("click", () => check(true));
    el("btnUpdate").addEventListener("click", () => el("updateBox").classList.toggle("hidden"));
    el("btnUpdateClose").addEventListener("click", () => el("updateBox").classList.add("hidden"));
    el("btnUpdateNow").addEventListener("click", install);
    // Kiểm tra ngầm sau khi Panel mở 1.5 giây
    setTimeout(() => check(false), 1500);
  }

  return { init, check, compareVersion };
})();

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (!csInterface) csInterface = new CSInterface();
  } catch (_) {}
  Updater.init();
});
