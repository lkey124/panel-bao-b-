let csInterface = null;
const STORAGE_KEY = "BAOBI_ARTBOARD_GRID_PRESETS_V2";

const DEFAULT_PRESETS = [
  // 100 ml/g
  { id: "p01", group: "100 ml/g", sizeText: "15x22 cm", w: 15.0, h: 22.0, type: "Túi", note: "", mL: 1.0, mR: 1.0, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p02", group: "100 ml/g", sizeText: "17.2x4.4 cm", w: 17.2, h: 4.4, type: "Chai", note: "", mL: 0.8, mR: 0.8, mT: 0.4, mB: 0.4, cols: 3 },

  // 250 ml/g
  { id: "p03", group: "250 ml/g", sizeText: "7.5x13.5 cm", w: 7.5, h: 13.5, type: "Túi/ Decal", note: "", mL: 0.6, mR: 0.6, mT: 0.6, mB: 0.6, cols: 3 },
  { id: "p04", group: "250 ml/g", sizeText: "15x22 cm", w: 15.0, h: 22.0, type: "Túi", note: "", mL: 1.0, mR: 1.0, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p05", group: "250 ml/g", sizeText: "22x6.8 cm", w: 22.0, h: 6.8, type: "Chai/ Couche", note: "", mL: 1.0, mR: 1.0, mT: 0.5, mB: 0.5, cols: 3 },
  { id: "p06", group: "250 ml/g", sizeText: "8.1x5.5cm", w: 8.1, h: 5.5, type: "Chai vuông/ Decal", note: "", mL: 0.5, mR: 0.5, mT: 0.5, mB: 0.5, cols: 3 },
  { id: "p07", group: "250 ml/g", sizeText: "20.2x5.6 cm", w: 20.2, h: 5.6, type: "Chai/ Couche", note: "", mL: 1.0, mR: 1.0, mT: 0.5, mB: 0.5, cols: 3 },

  // 500 ml/g
  { id: "p08", group: "500 ml/g", sizeText: "24.5x8.5 cm", w: 24.5, h: 8.5, type: "Chai tròn/ Couche", note: "", mL: 1.0, mR: 1.0, mT: 0.6, mB: 0.6, cols: 3 },
  { id: "p09", group: "500 ml/g", sizeText: "24.2x9.5 cm", w: 24.2, h: 9.5, type: "Chai / Decal", note: "", mL: 1.0, mR: 1.0, mT: 0.6, mB: 0.6, cols: 3 },
  { id: "p10", group: "500 ml/g", sizeText: "23.5x9.5 cm", w: 23.5, h: 9.5, type: "Chai / Decal", note: "", mL: 1.0, mR: 1.0, mT: 0.6, mB: 0.6, cols: 3 },
  { id: "p11", group: "500 ml/g", sizeText: "9.8x6.8 cm", w: 9.8, h: 6.8, type: "Chai vuông NN/ Decal", note: "", mL: 0.6, mR: 0.6, mT: 0.5, mB: 0.5, cols: 3 },
  { id: "p12", group: "500 ml/g", sizeText: "24.8x6.9", w: 24.8, h: 6.9, type: "Chai NN / Couche", note: "", mL: 1.0, mR: 1.0, mT: 0.5, mB: 0.5, cols: 3 },
  { id: "p13", group: "500 ml/g", sizeText: "23.8x11.5cm", w: 23.8, h: 11.5, type: "Chai VNS/ Couche", note: "", mL: 1.0, mR: 1.0, mT: 0.8, mB: 0.8, cols: 3 },
  { id: "p14", group: "500 ml/g", sizeText: "22.5x11.5 cm", w: 22.5, h: 11.5, type: "Chai/ Decal", note: "Chai Multi vitamin", mL: 1.0, mR: 1.0, mT: 0.8, mB: 0.8, cols: 3 },
  { id: "p15", group: "500 ml/g", sizeText: "23.6x11.5", w: 23.6, h: 11.5, type: "Chai NK/ Couche", note: "", mL: 1.0, mR: 1.0, mT: 0.8, mB: 0.8, cols: 3 },
  { id: "p16", group: "500 ml/g", sizeText: "18x26cm", w: 18.0, h: 26.0, type: "Túi", note: "", mL: 1.2, mR: 1.2, mT: 1.2, mB: 1.2, cols: 3 },
  { id: "p17", group: "500 ml/g", sizeText: "15x18 cm", w: 15.0, h: 18.0, type: "Túi", note: "", mL: 1.0, mR: 1.0, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p18", group: "500 ml/g", sizeText: "35.2x9.4 cm", w: 35.2, h: 9.4, type: "hũ vuông thấp / decal", note: "", mL: 1.2, mR: 1.2, mT: 0.6, mB: 0.6, cols: 3 },
  { id: "p19", group: "500 ml/g", sizeText: "28.5x9.5 cm", w: 28.5, h: 9.5, type: "hũ tròn cao / decal", note: "", mL: 1.0, mR: 1.0, mT: 0.6, mB: 0.6, cols: 3 },
  { id: "p20", group: "500 ml/g", sizeText: "36x7.5 cm", w: 36.0, h: 7.5, type: "hũ tròn thấp / decal", note: "Điều chỉnh lại từ kích thước 37x7.5 cm", mL: 1.2, mR: 1.2, mT: 0.5, mB: 0.5, cols: 3 },

  // 1 lít/kg
  { id: "p21", group: "1 lít/kg", sizeText: "26.5x15.5 cm", w: 26.5, h: 15.5, type: "chai/ decal", note: "", mL: 1.2, mR: 1.2, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p22", group: "1 lít/kg", sizeText: "26x18.5 cm", w: 26.0, h: 18.5, type: "chai xanh/ decal", note: "", mL: 1.2, mR: 1.2, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p23", group: "1 lít/kg", sizeText: "42x17.5 cm", w: 42.0, h: 17.5, type: "hũ vuông cao / decal", note: "", mL: 1.5, mR: 1.5, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p24", group: "1 lít/kg", sizeText: "32.5x14.3 cm", w: 32.5, h: 14.3, type: "hũ tròn / decal", note: "", mL: 1.2, mR: 1.2, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p25", group: "1 lít/kg", sizeText: "22x30 cm", w: 22.0, h: 30.0, type: "túi", note: "", mL: 1.5, mR: 1.5, mT: 1.5, mB: 1.5, cols: 3 },
  { id: "p26", group: "1 lít/kg", sizeText: "22.5x17x5.8 cm", w: 22.5, h: 17.0, type: "hộp", note: "Hộp 3 chiều: 22.5 x 17 x 5.8 cm", mL: 5.8, mR: 5.8, mT: 1.0, mB: 1.0, cols: 3 },

  // 5 lít
  { id: "p27", group: "5 lít", sizeText: "22.5x14.7 cm", w: 22.5, h: 14.7, type: "can", note: "", mL: 1.2, mR: 1.2, mT: 1.0, mB: 1.0, cols: 3 },
  { id: "p28", group: "5 lít", sizeText: "15x15 cm", w: 15.0, h: 15.0, type: "can nhập", note: "", mL: 1.0, mR: 1.0, mT: 1.0, mB: 1.0, cols: 3 },

  // 10kg
  { id: "p29", group: "10kg", sizeText: "36x26 cm", w: 36.0, h: 26.0, type: "xô", note: "", mL: 1.5, mR: 1.5, mT: 1.5, mB: 1.5, cols: 3 },

  // 20 kg
  { id: "p30", group: "20 kg", sizeText: "36x26 cm", w: 36.0, h: 26.0, type: "xô", note: "", mL: 1.5, mR: 1.5, mT: 1.5, mB: 1.5, cols: 3 },
  { id: "p31", group: "20 kg", sizeText: "19x19 cm", w: 19.0, h: 19.0, type: "can", note: "", mL: 1.2, mR: 1.2, mT: 1.2, mB: 1.2, cols: 3 }
];

let allPresets = [];
let filteredPresets = [];
let selectedPresetId = "p08";

function parseNum(val, fallback = 0) {
  if (val === undefined || val === null) return fallback;
  const clean = String(val).replace(/,/g, ".");
  const n = parseFloat(clean);
  return isNaN(n) ? fallback : n;
}

function roundCm(val) {
  return Math.round(val * 1000) / 1000;
}

function sanitizeFileName(str) {
  return String(str || "BaoBi")
    .replace(/[\/\\:*?"<>|]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_");
}

function setStatus(msg, isError = false) {
  const box = document.getElementById("statusBox");
  if (!box) return;
  box.textContent = msg || "";
  if (!msg) {
    box.style.padding = "0";
    box.style.border = "none";
    box.style.background = "transparent";
    return;
  }
  box.style.padding = "3px 8px";
  box.style.color = isError ? "#ff8a9e" : "#7ef4a8";
  box.style.background = isError ? "rgba(255, 90, 120, 0.16)" : "rgba(90, 240, 150, 0.14)";
  box.style.border = isError ? "1px solid rgba(255, 90, 120, 0.4)" : "1px solid rgba(90, 240, 150, 0.35)";

  setTimeout(() => {
    if (box.textContent === msg) {
      box.textContent = "";
      box.style.padding = "0";
      box.style.border = "none";
      box.style.background = "transparent";
    }
  }, 4000);
}

function loadPresets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        allPresets = parsed;
        return;
      }
    }
  } catch (_) {}
  allPresets = JSON.parse(JSON.stringify(DEFAULT_PRESETS));
}

function savePresets() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allPresets));
  } catch (_) {}
}

// Thực thi code ExtendScript độc lập 100% (không phụ thuộc vào file index.jsx bên ngoài)
function evalJSX(code, cb) {
  if (!csInterface) {
    try {
      csInterface = new CSInterface();
    } catch (e) {
      setStatus("Không thể kết nối Illustrator: " + e.message, true);
      return;
    }
  }
  csInterface.evalScript(code, (res) => {
    if (!res || res === "EvalScript error.") {
      setStatus("Lỗi thực thi lệnh trong Illustrator!", true);
      return;
    }
    try {
      const data = JSON.parse(res);
      if (data && data.error) {
        setStatus("Lỗi: " + data.error, true);
        return;
      }
      if (cb) cb(data);
    } catch (_) {
      if (cb) cb(res);
    }
  });
}

function buildSelfContainedJSX(p) {
  const safeAbName = sanitizeFileName(p.abName);
  return `(function(){
    try {
      var CM_TO_PT = 72.0 / 2.54;
      var mode = "${p.mode}";
      var onlyGrid = ${p.onlyGrid ? "true" : "false"};
      var wCm = ${Number(p.wCm)};
      var hCm = ${Number(p.hCm)};
      var numAb = ${Math.max(1, Math.min(100, Math.floor(Number(p.numArtboards) || 1)))};
      var gapCm = ${Math.max(0.2, Number(p.abGapCm) || 2.0)};
      var colsPerRow = ${Math.max(1, Math.floor(Number(p.abColsPerRow) || 4))};
      var safeName = "${safeAbName}";
      var mLeftCm = ${Number(p.mLeftCm)};
      var mRightCm = ${Number(p.mRightCm)};
      var mTopCm = ${Number(p.mTopCm)};
      var mBotCm = ${Number(p.mBotCm)};
      var centerCols = ${Math.max(1, Math.floor(Number(p.centerCols) || 3))};
      var centerRows = ${Math.max(1, Math.floor(Number(p.centerRows) || 1))};
      var extendOutside = ${p.extendOutside ? "true" : "false"};
      var useSeparateLayer = ${p.useSeparateLayer ? "true" : "false"};
      var clearOldGuides = ${p.clearOldGuides ? "true" : "false"};

      var wPt = wCm * CM_TO_PT;
      var hPt = hCm * CM_TO_PT;
      var gapPt = gapCm * CM_TO_PT;
      var doc = null;
      var createdIndices = [];

      if (onlyGrid || mode === "UPDATE_CURRENT") {
        if (app.documents.length === 0) return '{"error":"Chưa có file nào đang mở!"}';
        doc = app.activeDocument;
        var curIdx = doc.artboards.getActiveArtboardIndex();
        var curAb = doc.artboards[curIdx];
        var curRect = curAb.artboardRect;
        if (!onlyGrid) {
          curAb.artboardRect = [curRect[0], curRect[1], curRect[0] + wPt, curRect[1] - hPt];
          curAb.name = safeName;
        }
        createdIndices.push(curIdx);
      } else if (mode === "NEW_DOC" || app.documents.length === 0) {
        var preset = new DocumentPreset();
        preset.title = safeName;
        preset.width = wPt;
        preset.height = hPt;
        preset.units = RulerUnits.Centimeters;
        preset.colorMode = DocumentColorSpace.CMYK;
        preset.rasterResolution = DocumentRasterResolution.HighResolution;
        preset.numArtboards = numAb;
        if (numAb > 1) {
          preset.artboardLayout = DocumentArtboardLayout.GridByRow;
          preset.artboardSpacing = gapPt;
          preset.artboardRowsOrCols = Math.min(numAb, colsPerRow);
        }
        doc = app.documents.addDocument(DocumentPresetType.Print, preset);
        for (var i = 0; i < doc.artboards.length; i++) {
          var suffix = numAb > 1 ? ("_" + ((i + 1) < 10 ? "0" + (i + 1) : (i + 1))) : "";
          doc.artboards[i].name = safeName + suffix;
          createdIndices.push(i);
        }
      } else if (mode === "ADD_AB") {
        doc = app.activeDocument;
        var lastRect = doc.artboards[doc.artboards.length - 1].artboardRect;
        var baseLeft = lastRect[2] + gapPt;
        var baseTop = lastRect[1];

        for (var k = 0; k < numAb; k++) {
          var colK = k % colsPerRow;
          var rowK = Math.floor(k / colsPerRow);
          var newL = baseLeft + colK * (wPt + gapPt);
          var newT = baseTop - rowK * (hPt + gapPt);
          var newRect = [newL, newT, newL + wPt, newT - hPt];
          var newAbItem = doc.artboards.add(newRect);
          var numStr = numAb > 1 ? ("_" + ((k + 1) < 10 ? "0" + (k + 1) : (k + 1))) : "";
          newAbItem.name = safeName + numStr;
          createdIndices.push(doc.artboards.length - 1);
        }
        doc.artboards.setActiveArtboardIndex(createdIndices[0]);
      }

      var layerName = useSeparateLayer ? "Luoi_Guides_BaoBi" : doc.activeLayer.name;
      var guideLayer = null;
      if (useSeparateLayer) {
        try {
          guideLayer = doc.layers.getByName(layerName);
        } catch (e) {
          guideLayer = doc.layers.add();
          guideLayer.name = layerName;
        }
      } else {
        guideLayer = doc.activeLayer;
      }
      guideLayer.locked = false;
      guideLayer.visible = true;

      var totalRowsCreated = Math.ceil(createdIndices.length / colsPerRow);
      var minAllX = 999999, maxAllY = -999999, maxAllX = -999999, minAllY = 999999;

      for (var idxPos = 0; idxPos < createdIndices.length; idxPos++) {
        var abIndex = createdIndices[idxPos];
        var abObj = doc.artboards[abIndex];
        var abRect = abObj.artboardRect;

        var left = abRect[0];
        var top = abRect[1];
        var right = abRect[2];
        var bottom = abRect[3];
        var actualW = right - left;
        var actualH = top - bottom;

        if (left < minAllX) minAllX = left;
        if (right > maxAllX) maxAllX = right;
        if (top > maxAllY) maxAllY = top;
        if (bottom < minAllY) minAllY = bottom;

        var groupTag = "GRID_AB_" + abIndex;
        if (clearOldGuides) {
          for (var g = guideLayer.groupItems.length - 1; g >= 0; g--) {
            if (
              guideLayer.groupItems[g].note === groupTag ||
              guideLayer.groupItems[g].name.indexOf("Luoi_AB_" + (abIndex + 1) + "_") === 0
            ) {
              guideLayer.groupItems[g].remove();
            }
          }
        }

        var gridGroup = guideLayer.groupItems.add();
        gridGroup.name = "Luoi_AB_" + (abIndex + 1) + "_" + abObj.name;
        gridGroup.note = groupTag;

        var extX = 0;
        var extY = 0;
        if (extendOutside) {
          if (createdIndices.length === 1) {
            extX = Math.max(actualW, actualH) * 2.0 + 1000;
            extY = extX;
          } else {
            extX = Math.min(gapPt * 0.42, 2.0 * CM_TO_PT);
            extY = (totalRowsCreated === 1) ? (actualH * 1.5 + 500) : Math.min(gapPt * 0.42, 2.0 * CM_TO_PT);
          }
        }

        function drawGuide(x1, y1, x2, y2, guideName) {
          var line = gridGroup.pathItems.add();
          line.setEntirePath([[x1, y1], [x2, y2]]);
          line.filled = false;
          line.stroked = true;
          line.guides = true;
          if (guideName) line.name = guideName;
        }

        var mTopPt = mTopCm * CM_TO_PT;
        var mBotPt = mBotCm * CM_TO_PT;
        if (mTopPt > 0 && mTopPt < actualH) {
          var yTop = top - mTopPt;
          drawGuide(left - extX, yTop, right + extX, yTop, "Mep_Tren_" + mTopCm + "cm");
        }
        if (mBotPt > 0 && mBotPt < actualH) {
          var yBot = bottom + mBotPt;
          drawGuide(left - extX, yBot, right + extX, yBot, "Mep_Duoi_" + mBotCm + "cm");
        }

        var mLeftPt = mLeftCm * CM_TO_PT;
        var mRightPt = mRightCm * CM_TO_PT;
        var xLeftGuide = left + mLeftPt;
        var xRightGuide = right - mRightPt;

        if (mLeftPt > 0 && mLeftPt < actualW) {
          drawGuide(xLeftGuide, top + extY, xLeftGuide, bottom - extY, "Mep_Trai_" + mLeftCm + "cm");
        }
        if (mRightPt > 0 && mRightPt < actualW) {
          drawGuide(xRightGuide, top + extY, xRightGuide, bottom - extY, "Mep_Phai_" + mRightCm + "cm");
        }

        var innerWidthPt = xRightGuide - xLeftGuide;
        if (centerCols > 1 && innerWidthPt > 0) {
          var stepPt = innerWidthPt / centerCols;
          for (var c = 1; c < centerCols; c++) {
            var xMid = xLeftGuide + stepPt * c;
            drawGuide(xMid, top + extY, xMid, bottom - extY, "Chia_Giua_" + c + "_" + centerCols);
          }
        }

        var innerHeightPt = (top - mTopPt) - (bottom + mBotPt);
        if (centerRows > 1 && innerHeightPt > 0) {
          var stepRowPt = innerHeightPt / centerRows;
          for (var r = 1; r < centerRows; r++) {
            var yMid = (top - mTopPt) - stepRowPt * r;
            drawGuide(left - extX, yMid, right + extX, yMid, "Chia_Hang_Ngang_" + r + "_" + centerRows);
          }
        }
      }

      try {
        var totalW = maxAllX - minAllX;
        var totalH = maxAllY - minAllY;
        var view = doc.views[0];
        view.centerPoint = [minAllX + totalW / 2, minAllY + totalH / 2];
        var zoomW = 750 / totalW;
        var zoomH = 520 / totalH;
        var targetZoom = Math.min(zoomW, zoomH);
        if (targetZoom > 0.05 && targetZoom < 16) view.zoom = targetZoom;
      } catch (e) {}

      app.redraw();
      return '{"ok":true,"count":' + createdIndices.length + '}';
    } catch (err) {
      var msg = String(err.message || err).replace(/"/g, '\\\\"').replace(/\\r?\\n/g, " ");
      return '{"error":"' + msg + '"}';
    }
  })();`;
}

function buildClearGuidesJSX() {
  return `(function(){
    try {
      if (app.documents.length === 0) return '{"error":"Chưa có file nào đang mở!"}';
      var doc = app.activeDocument;
      var abIndex = doc.artboards.getActiveArtboardIndex();
      var groupTag = "GRID_AB_" + abIndex;
      var removed = 0;
      for (var l = 0; l < doc.layers.length; l++) {
        var lyr = doc.layers[l];
        if (lyr.locked) continue;
        for (var g = lyr.groupItems.length - 1; g >= 0; g--) {
          if (
            lyr.groupItems[g].note === groupTag ||
            lyr.groupItems[g].name.indexOf("Luoi_AB_" + (abIndex + 1)) === 0
          ) {
            lyr.groupItems[g].remove();
            removed++;
          }
        }
      }
      app.redraw();
      return '{"ok":true,"removed":' + removed + '}';
    } catch (err) {
      var msg = String(err.message || err).replace(/"/g, '\\\\"').replace(/\\r?\\n/g, " ");
      return '{"error":"' + msg + '"}';
    }
  })();`;
}

function renderPresetTable() {
  const tbody = document.getElementById("presetTableBody");
  const selGroup = document.getElementById("selGroup").value;
  const keyword = document.getElementById("txtSearch").value.trim().toLowerCase();

  tbody.innerHTML = "";
  filteredPresets = allPresets.filter((item) => {
    const matchGroup = selGroup === "ALL" || item.group === selGroup;
    const hay = `${item.group} ${item.sizeText} ${item.type} ${item.note}`.toLowerCase();
    const matchSearch = !keyword || hay.includes(keyword);
    return matchGroup && matchSearch;
  });

  filteredPresets.forEach((item) => {
    const tr = document.createElement("tr");
    if (item.id === selectedPresetId) tr.classList.add("active");

    const marginStr = `[Mép T:${item.mL} P:${item.mR} Tr:${item.mT} D:${item.mB} | Chia:${item.cols || 3}]`;
    const noteHtml = item.note ? `<b>${item.note}</b><br/><span class="td-sub">${marginStr}</span>` : `<span class="td-sub">${marginStr}</span>`;

    tr.innerHTML = `
      <td>${item.group}</td>
      <td class="td-size">${item.sizeText}</td>
      <td class="td-type">${item.type}</td>
      <td>${noteHtml}</td>
    `;

    tr.addEventListener("click", () => {
      selectedPresetId = item.id;
      applyPresetToInputs(item);
      renderPresetTable();
    });

    tr.addEventListener("dblclick", () => {
      selectedPresetId = item.id;
      applyPresetToInputs(item);
      renderPresetTable();
      handleExecute(false);
    });

    tbody.appendChild(tr);
  });
}

function applyPresetToInputs(p) {
  document.getElementById("txtWidth").value = p.w;
  document.getElementById("txtHeight").value = p.h;
  document.getElementById("txtMarginLeft").value = p.mL !== undefined ? p.mL : 1.0;
  document.getElementById("txtMarginRight").value = p.mR !== undefined ? p.mR : 1.0;
  document.getElementById("txtMarginTop").value = p.mT !== undefined ? p.mT : 0.6;
  document.getElementById("txtMarginBottom").value = p.mB !== undefined ? p.mB : 0.6;
  document.getElementById("txtCenterCols").value = p.cols !== undefined ? p.cols : 3;

  const cleanGroup = sanitizeFileName(p.group);
  const cleanType = sanitizeFileName(p.type);
  document.getElementById("txtAbName").value = `${cleanGroup}_${cleanType}_${p.w}x${p.h}cm`;

  updatePreviewAndSummary();
}

function syncQuickCountHighlight() {
  const curVal = String(Math.max(1, Math.floor(parseNum(document.getElementById("txtNumArtboards").value, 1))));
  document.querySelectorAll(".btn-qcount").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-count") === curVal);
  });
}

function updatePreviewAndSummary() {
  const wCm = Math.max(0.1, parseNum(document.getElementById("txtWidth").value, 24.5));
  const hCm = Math.max(0.1, parseNum(document.getElementById("txtHeight").value, 8.5));
  const numAb = Math.max(1, Math.floor(parseNum(document.getElementById("txtNumArtboards").value, 1)));
  const mL = Math.max(0, parseNum(document.getElementById("txtMarginLeft").value, 1.0));
  const mR = Math.max(0, parseNum(document.getElementById("txtMarginRight").value, 1.0));
  const mT = Math.max(0, parseNum(document.getElementById("txtMarginTop").value, 0.6));
  const mB = Math.max(0, parseNum(document.getElementById("txtMarginBottom").value, 0.6));
  const cols = Math.max(1, Math.min(20, Math.floor(parseNum(document.getElementById("txtCenterCols").value, 3))));
  const rows = Math.max(1, Math.min(20, Math.floor(parseNum(document.getElementById("txtCenterRows").value, 1))));
  const ext = document.getElementById("chkExtendOutside").checked;

  syncQuickCountHighlight();

  const innerW = roundCm(wCm - mL - mR);
  const innerH = roundCm(hCm - mT - mB);
  const eachColW = roundCm(innerW / cols);

  const summaryEl = document.getElementById("calcSummary");
  if (innerW <= 0 || innerH <= 0) {
    summaryEl.innerHTML = `<span style="color:#ff8a9e;">⚠️ Cảnh báo: Tổng 2 mép đang lớn hơn hoặc bằng Artboard!</span>`;
  } else {
    summaryEl.innerHTML =
      `• Tạo: <b style="color:#ffd166;">${numAb} Artboard</b> (${wCm}×${hCm} cm)<br/>` +
      `• Vùng giữa: <b>${innerW} × ${innerH} cm</b><br/>` +
      `• Chia <b>${cols} cột</b> ➔ Mỗi cột: <b>${eachColW} cm</b>`;
  }

  const canvas = document.getElementById("previewCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const cw = canvas.width;
  const ch = canvas.height;

  ctx.fillStyle = "#535353";
  ctx.fillRect(0, 0, cw, ch);

  const pad = 14;
  const availW = cw - pad * 2;
  const availH = ch - pad * 2;
  const scale = Math.min(availW / wCm, availH / hCm);

  const abW = wCm * scale;
  const abH = hCm * scale;
  const abX = (cw - abW) / 2;
  const abY = (ch - abH) / 2;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(abX, abY, abW, abH);
  ctx.strokeStyle = "#141414";
  ctx.lineWidth = 1;
  ctx.strokeRect(abX, abY, abW, abH);

  ctx.strokeStyle = "#29f2ff";
  ctx.lineWidth = 1;

  const gx1 = ext ? 0 : abX;
  const gx2 = ext ? cw : abX + abW;
  const gy1 = ext ? 0 : abY;
  const gy2 = ext ? ch : abY + abH;

  function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  const yTop = abY + mT * scale;
  const yBot = abY + abH - mB * scale;
  if (mT > 0 && mT < hCm) drawLine(gx1, yTop, gx2, yTop);
  if (mB > 0 && mB < hCm) drawLine(gx1, yBot, gx2, yBot);

  const xLeft = abX + mL * scale;
  const xRight = abX + abW - mR * scale;
  if (mL > 0 && mL < wCm) drawLine(xLeft, gy1, xLeft, gy2);
  if (mR > 0 && mR < wCm) drawLine(xRight, gy1, xRight, gy2);

  const innerPxW = xRight - xLeft;
  if (cols > 1 && innerPxW > 2) {
    const stepX = innerPxW / cols;
    for (let c = 1; c < cols; c++) {
      drawLine(xLeft + stepX * c, gy1, xLeft + stepX * c, gy2);
    }
  }

  const innerPxH = yBot - yTop;
  if (rows > 1 && innerPxH > 2) {
    const stepY = innerPxH / rows;
    for (let r = 1; r < rows; r++) {
      drawLine(gx1, yTop + stepY * r, gx2, yTop + stepY * r);
    }
  }
}

function handleExecute(onlyGrid = false) {
  const wCm = parseNum(document.getElementById("txtWidth").value, 0);
  const hCm = parseNum(document.getElementById("txtHeight").value, 0);
  if (!onlyGrid && (wCm <= 0 || hCm <= 0)) {
    setStatus("Chiều Rộng và Chiều Cao phải lớn hơn 0 cm!", true);
    return;
  }

  const params = {
    mode: onlyGrid ? "UPDATE_CURRENT" : document.getElementById("selMode").value,
    onlyGrid,
    wCm,
    hCm,
    numArtboards: Math.max(1, Math.min(100, Math.floor(parseNum(document.getElementById("txtNumArtboards").value, 1)))),
    abGapCm: Math.max(0.2, parseNum(document.getElementById("txtAbGap").value, 2.0)),
    abColsPerRow: Math.max(1, Math.floor(parseNum(document.getElementById("txtAbCols").value, 4))),
    abName: document.getElementById("txtAbName").value || `BaoBi_${wCm}x${hCm}cm`,
    mLeftCm: parseNum(document.getElementById("txtMarginLeft").value, 0),
    mRightCm: parseNum(document.getElementById("txtMarginRight").value, 0),
    mTopCm: parseNum(document.getElementById("txtMarginTop").value, 0),
    mBotCm: parseNum(document.getElementById("txtMarginBottom").value, 0),
    centerCols: Math.max(1, Math.floor(parseNum(document.getElementById("txtCenterCols").value, 3))),
    centerRows: Math.max(1, Math.floor(parseNum(document.getElementById("txtCenterRows").value, 1))),
    extendOutside: document.getElementById("chkExtendOutside").checked,
    useSeparateLayer: document.getElementById("chkSeparateLayer").checked,
    clearOldGuides: document.getElementById("chkClearOld").checked
  };

  const autoClose = document.getElementById("chkAutoClose").checked;
  const jsxCode = buildSelfContainedJSX(params);

  evalJSX(jsxCode, (res) => {
    setStatus(onlyGrid ? "✓ Đã cập nhật lại Lưới!" : `✓ Đã tạo ${params.numArtboards} Artboard (${wCm}×${hCm} cm) & kẻ Lưới!`);
    if (autoClose && !onlyGrid && csInterface) {
      setTimeout(() => {
        try {
          csInterface.closeExtension();
        } catch (_) {}
      }, 250);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    csInterface = new CSInterface();
  } catch (_) {}

  loadPresets();
  renderPresetTable();

  const initialPreset = allPresets.find((p) => p.id === selectedPresetId) || allPresets[0];
  if (initialPreset) applyPresetToInputs(initialPreset);

  document.getElementById("selGroup").addEventListener("change", renderPresetTable);
  document.getElementById("txtSearch").addEventListener("input", renderPresetTable);

  document.querySelectorAll(".btn-qcount").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("txtNumArtboards").value = btn.getAttribute("data-count");
      updatePreviewAndSummary();
    });
  });

  const txtML = document.getElementById("txtMarginLeft");
  const txtMR = document.getElementById("txtMarginRight");
  const chkLockLR = document.getElementById("chkLockLR");

  txtML.addEventListener("input", () => {
    if (chkLockLR.checked) txtMR.value = txtML.value;
    updatePreviewAndSummary();
  });
  txtMR.addEventListener("input", () => {
    if (chkLockLR.checked) txtML.value = txtMR.value;
    updatePreviewAndSummary();
  });
  chkLockLR.addEventListener("change", () => {
    if (chkLockLR.checked) {
      txtMR.value = txtML.value;
      updatePreviewAndSummary();
    }
  });

  const txtMT = document.getElementById("txtMarginTop");
  const txtMB = document.getElementById("txtMarginBottom");
  const chkLockTB = document.getElementById("chkLockTB");

  txtMT.addEventListener("input", () => {
    if (chkLockTB.checked) txtMB.value = txtMT.value;
    updatePreviewAndSummary();
  });
  txtMB.addEventListener("input", () => {
    if (chkLockTB.checked) txtMT.value = txtMB.value;
    updatePreviewAndSummary();
  });
  chkLockTB.addEventListener("change", () => {
    if (chkLockTB.checked) {
      txtMB.value = txtMT.value;
      updatePreviewAndSummary();
    }
  });

  ["txtWidth", "txtHeight", "txtNumArtboards", "txtCenterCols", "txtCenterRows"].forEach((id) => {
    document.getElementById(id).addEventListener("input", updatePreviewAndSummary);
  });
  document.getElementById("chkExtendOutside").addEventListener("change", updatePreviewAndSummary);

  document.getElementById("btnSwapWH").addEventListener("click", () => {
    const wEl = document.getElementById("txtWidth");
    const hEl = document.getElementById("txtHeight");
    const tmp = wEl.value;
    wEl.value = hEl.value;
    hEl.value = tmp;
    updatePreviewAndSummary();
  });

  document.getElementById("btnSaveMargin").addEventListener("click", () => {
    const item = allPresets.find((p) => p.id === selectedPresetId);
    if (!item) {
      setStatus("Hãy chọn 1 mẫu trong bảng trước!", true);
      return;
    }
    item.w = parseNum(document.getElementById("txtWidth").value, item.w);
    item.h = parseNum(document.getElementById("txtHeight").value, item.h);
    item.sizeText = `${item.w}x${item.h} cm`;
    item.mL = parseNum(txtML.value, 1.0);
    item.mR = parseNum(txtMR.value, 1.0);
    item.mT = parseNum(txtMT.value, 0.6);
    item.mB = parseNum(txtMB.value, 0.6);
    item.cols = Math.max(1, Math.floor(parseNum(document.getElementById("txtCenterCols").value, 3)));

    savePresets();
    renderPresetTable();
    setStatus(`Đã lưu thông số Mép cho mẫu [${item.group} - ${item.type}]!`);
  });

  const addBox = document.getElementById("addPresetBox");
  document.getElementById("btnToggleAddModal").addEventListener("click", () => {
    addBox.classList.toggle("hidden");
  });
  document.getElementById("btnCancelAdd").addEventListener("click", () => {
    addBox.classList.add("hidden");
  });
  document.getElementById("btnConfirmAdd").addEventListener("click", () => {
    const w = parseNum(document.getElementById("txtWidth").value, 15);
    const h = parseNum(document.getElementById("txtHeight").value, 22);
    const group = document.getElementById("newGroup").value.trim() || "Khác";
    const type = document.getElementById("newType").value.trim() || "Nhãn";
    const note = document.getElementById("newNote").value.trim();

    const newItem = {
      id: "custom_" + Date.now(),
      group,
      sizeText: `${w}x${h} cm`,
      w,
      h,
      type,
      note,
      mL: parseNum(txtML.value, 1.0),
      mR: parseNum(txtMR.value, 1.0),
      mT: parseNum(txtMT.value, 0.6),
      mB: parseNum(txtMB.value, 0.6),
      cols: Math.max(1, Math.floor(parseNum(document.getElementById("txtCenterCols").value, 3)))
    };

    allPresets.push(newItem);
    selectedPresetId = newItem.id;
    savePresets();
    renderPresetTable();
    addBox.classList.add("hidden");
    setStatus("Đã thêm mẫu mới vào bảng!");
  });

  document.getElementById("btnDeletePreset").addEventListener("click", () => {
    const idx = allPresets.findIndex((p) => p.id === selectedPresetId);
    if (idx === -1) return;
    allPresets.splice(idx, 1);
    if (allPresets.length > 0) selectedPresetId = allPresets[0].id;
    savePresets();
    renderPresetTable();
    setStatus("Đã xóa mẫu khỏi bảng!");
  });

  document.getElementById("btnResetPresets").addEventListener("click", () => {
    allPresets = JSON.parse(JSON.stringify(DEFAULT_PRESETS));
    selectedPresetId = "p08";
    savePresets();
    renderPresetTable();
    applyPresetToInputs(allPresets[7]);
    setStatus("Đã khôi phục 31 mẫu gốc!");
  });

  document.getElementById("btnCreateAll").addEventListener("click", () => handleExecute(false));
  document.getElementById("btnUpdateGridOnly").addEventListener("click", () => handleExecute(true));
  document.getElementById("btnClearGrid").addEventListener("click", () => {
    evalJSX(buildClearGuidesJSX(), () => {
      setStatus("Đã xóa lưới trên Artboard hiện tại!");
    });
  });
});
