#target illustrator
#targetengine "BaoBiArtboardGridPanelEngine"

/**
 * ============================================================================
 * BẢNG TẠO ARTBOARD & LƯỚI BAO BÌ CHUẨN (ADOBE ILLUSTRATOR)
 * ============================================================================
 * - Hiển thị đầy đủ bảng 31 kích thước chuẩn (Hình 2).
 * - Cho phép chọn SỐ LƯỢNG ARTBOARD muốn tạo cùng lúc (1, 2, 3, 4, 5... Artboard).
 * - Tùy chỉnh 4 mép riêng biệt (Trái, Phải, Trên, Dưới) & Chia đều vùng giữa (Hình 1).
 * - Tạo xong tự động tắt bảng ngay để bắt đầu thiết kế.
 * ============================================================================
 */

function showBaoBiArtboardGridUI(windowType) {
    var winType = windowType || "dialog";
    var CM_TO_PT = 72.0 / 2.54;
    var SETTINGS_FILE = new File(Folder.userData.fsName + "/Illustrator_BaoBi_Grid_Presets_v1.txt");

    // Danh sách 31 kích thước chuẩn từ bảng dữ liệu (Hình 2)
    var DEFAULT_PRESETS = [
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

    function parseNum(str, fallback) {
        if (str === undefined || str === null) return fallback;
        var clean = String(str).replace(/,/g, ".").replace(/[^0-9.\-]/g, "");
        var val = parseFloat(clean);
        return isNaN(val) ? fallback : val;
    }

    function roundCm(val) {
        return Math.round(val * 1000) / 1000;
    }

    function savePresetsToFile(presets) {
        try {
            SETTINGS_FILE.encoding = "UTF-8";
            if (SETTINGS_FILE.open("w")) {
                SETTINGS_FILE.write(presets.toSource());
                SETTINGS_FILE.close();
                return true;
            }
        } catch (e) {}
        return false;
    }

    function loadPresetsFromFile() {
        try {
            if (SETTINGS_FILE.exists) {
                SETTINGS_FILE.encoding = "UTF-8";
                if (SETTINGS_FILE.open("r")) {
                    var content = SETTINGS_FILE.read();
                    SETTINGS_FILE.close();
                    if (content && content.length > 5) {
                        var loaded = eval(content);
                        if (loaded && loaded.length > 0) {
                            return loaded;
                        }
                    }
                }
            }
        } catch (e) {}
        var copy = [];
        for (var i = 0; i < DEFAULT_PRESETS.length; i++) {
            var p = DEFAULT_PRESETS[i];
            copy.push({
                id: p.id, group: p.group, sizeText: p.sizeText,
                w: p.w, h: p.h, type: p.type, note: p.note,
                mL: p.mL, mR: p.mR, mT: p.mT, mB: p.mB, cols: p.cols
            });
        }
        return copy;
    }

    var allPresets = loadPresetsFromFile();
    var filteredPresets = [];

    // ========================================================================
    // HÀM TẠO NHIỀU ARTBOARD & LƯỚI GUIDES TRONG ILLUSTRATOR
    // ========================================================================
    function executeIllustratorDOM(p) {
        var wPt = p.wCm * CM_TO_PT;
        var hPt = p.hCm * CM_TO_PT;
        var gapPt = Math.max(0.5, p.abGapCm || 2.0) * CM_TO_PT;
        var numAb = Math.max(1, Math.min(100, Math.floor(p.numArtboards || 1)));
        var colsPerRow = Math.max(1, Math.floor(p.abColsPerRow || 4));
        var doc = null;
        var createdIndices = [];

        if (p.onlyGrid || p.mode === "UPDATE_CURRENT") {
            if (app.documents.length === 0) return;
            doc = app.activeDocument;
            var curIdx = doc.artboards.getActiveArtboardIndex();
            var curAb = doc.artboards[curIdx];
            var curRect = curAb.artboardRect;
            if (!p.onlyGrid) {
                curAb.artboardRect = [curRect[0], curRect[1], curRect[0] + wPt, curRect[1] - hPt];
                if (p.abName) curAb.name = p.abName;
            }
            createdIndices.push(curIdx);
        } else if (p.mode === "NEW_DOC" || app.documents.length === 0) {
            var preset = new DocumentPreset();
            preset.title = p.docName || "BaoBi_Artboard";
            preset.width = wPt;
            preset.height = hPt;
            preset.units = RulerUnits.Centimeters;
            preset.colorMode = DocumentColorSpace.CMYK;
            preset.rasterResolution = DocumentRasterResolution.HighResolution;
            doc = app.documents.addDocument(DocumentPresetType.Print, preset);

            // Artboard đầu tiên (index 0)
            var firstAb = doc.artboards[0];
            var firstRect = firstAb.artboardRect;
            var startX = firstRect[0];
            var startY = firstRect[1];
            firstAb.name = numAb > 1 ? (p.abName + "_01") : p.abName;
            createdIndices.push(0);

            // Tạo thêm các Artboard tiếp theo (từ 2 đến numAb)
            for (var i = 1; i < numAb; i++) {
                var cIdx = i % colsPerRow;
                var rIdx = Math.floor(i / colsPerRow);
                var abL = startX + cIdx * (wPt + gapPt);
                var abT = startY - rIdx * (hPt + gapPt);
                var rectI = [abL, abT, abL + wPt, abT - hPt];
                var addedAb = doc.artboards.add(rectI);
                var suffix = (i + 1) < 10 ? ("0" + (i + 1)) : String(i + 1);
                addedAb.name = p.abName + "_" + suffix;
                createdIndices.push(doc.artboards.length - 1);
            }
        } else if (p.mode === "ADD_AB") {
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
                newAbItem.name = p.abName + numStr;
                createdIndices.push(doc.artboards.length - 1);
            }
            doc.artboards.setActiveArtboardIndex(createdIndices[0]);
        }

        // Chuẩn bị Layer chứa đường lưới (Guides)
        var layerName = p.useSeparateLayer ? "Luoi_Guides_BaoBi" : doc.activeLayer.name;
        var guideLayer = null;
        if (p.useSeparateLayer) {
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

        // Kẻ lưới cho TỪNG Artboard vừa tạo
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
            if (p.clearOldGuides) {
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

            // Tính độ vươn của đường lưới ra ngoài Artboard (như Hình 1)
            var extX = 0;
            var extY = 0;
            if (p.extendOutside) {
                if (createdIndices.length === 1) {
                    extX = Math.max(actualW, actualH) * 2.5 + 1500;
                    extY = extX;
                } else {
                    // Khi có nhiều Artboard: vươn ra ngoài mép mỗi Artboard một đoạn gọn đẹp để không đè vào Artboard bên cạnh
                    extX = Math.min(gapPt * 0.42, 2.0 * CM_TO_PT);
                    extY = (totalRowsCreated === 1) ? (actualH * 2.0 + 800) : Math.min(gapPt * 0.42, 2.0 * CM_TO_PT);
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

            // 1. Kẻ 2 đường lưới ngang (Mép Trên & Mép Dưới)
            var mTopPt = p.mTopCm * CM_TO_PT;
            var mBotPt = p.mBotCm * CM_TO_PT;
            if (mTopPt > 0 && mTopPt < actualH) {
                var yTop = top - mTopPt;
                drawGuide(left - extX, yTop, right + extX, yTop, "Mep_Tren_" + p.mTopCm + "cm");
            }
            if (mBotPt > 0 && mBotPt < actualH) {
                var yBot = bottom + mBotPt;
                drawGuide(left - extX, yBot, right + extX, yBot, "Mep_Duoi_" + p.mBotCm + "cm");
            }

            // 2. Kẻ 2 đường lưới dọc ở 2 bên mép (Mép Trái & Mép Phải)
            var mLeftPt = p.mLeftCm * CM_TO_PT;
            var mRightPt = p.mRightCm * CM_TO_PT;
            var xLeftGuide = left + mLeftPt;
            var xRightGuide = right - mRightPt;

            if (mLeftPt > 0 && mLeftPt < actualW) {
                drawGuide(xLeftGuide, top + extY, xLeftGuide, bottom - extY, "Mep_Trai_" + p.mLeftCm + "cm");
            }
            if (mRightPt > 0 && mRightPt < actualW) {
                drawGuide(xRightGuide, top + extY, xRightGuide, bottom - extY, "Mep_Phai_" + p.mRightCm + "cm");
            }

            // 3. Chia đều khoảng ở giữa (giữa Mép Trái và Mép Phải)
            var innerWidthPt = xRightGuide - xLeftGuide;
            var cols = Math.floor(p.centerCols);
            if (cols > 1 && innerWidthPt > 0) {
                var stepPt = innerWidthPt / cols;
                for (var c = 1; c < cols; c++) {
                    var xMid = xLeftGuide + stepPt * c;
                    drawGuide(xMid, top + extY, xMid, bottom - extY, "Chia_Giua_" + c + "_" + cols);
                }
            }

            // 4. Chia đều khoảng giữa theo chiều dọc (nếu có)
            var innerHeightPt = (top - mTopPt) - (bottom + mBotPt);
            var rows = Math.floor(p.centerRows || 1);
            if (rows > 1 && innerHeightPt > 0) {
                var stepRowPt = innerHeightPt / rows;
                for (var r = 1; r < rows; r++) {
                    var yMid = (top - mTopPt) - stepRowPt * r;
                    drawGuide(left - extX, yMid, right + extX, yMid, "Chia_Hang_Ngang_" + r + "_" + rows);
                }
            }
        }

        // Căn chỉnh khung nhìn bao quát toàn bộ các Artboard vừa tạo
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
    }

    function runIllustratorAction(params) {
        try {
            executeIllustratorDOM(params);
        } catch (directErr) {
            if (typeof BridgeTalk !== "undefined") {
                var bt = new BridgeTalk();
                bt.target = "illustrator";
                bt.body = "(" + executeIllustratorDOM.toSource() + ")(" + params.toSource() + ");";
                bt.send();
            } else {
                alert("Lỗi khi tạo Artboard & Lưới: " + directErr.message);
            }
        }
    }

    // ========================================================================
    // GIAO DIỆN CHÍNH RỘNG RÃI, HIỂN THỊ ĐẦY ĐỦ (SCRIPTUI)
    // ========================================================================
    if ($.global.baoBiGridPanelWindow && $.global.baoBiGridPanelWindow instanceof Window) {
        try { $.global.baoBiGridPanelWindow.close(); } catch (e) {}
    }

    var win = new Window(winType, "BẢNG TẠO ARTBOARD & LƯỚI BAO BÌ CHUẨN (CM)", undefined, { resizeable: true });
    $.global.baoBiGridPanelWindow = win;
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 8;
    win.margins = 12;

    // ------------------------------------------------------------------------
    // PHẦN 1: BẢNG KÍCH THƯỚC CHUẨN HIỂN THỊ ĐẦY ĐỦ RỘNG RÃI (HÌNH 2)
    // ------------------------------------------------------------------------
    var pnlPresets = win.add("panel", undefined, "1. BẢNG KÍCH THƯỚC CHUẨN (CHỌN MẪU HOẶC NHẤP ĐÚP ĐỂ TẠO & TỰ TẮT)");
    pnlPresets.orientation = "column";
    pnlPresets.alignChildren = ["fill", "top"];
    pnlPresets.spacing = 6;
    pnlPresets.margins = [10, 14, 10, 10];

    var grpFilter = pnlPresets.add("group");
    grpFilter.orientation = "row";
    grpFilter.alignChildren = ["left", "center"];
    grpFilter.spacing = 8;

    grpFilter.add("statictext", undefined, "Lọc Cột 1 (Dung tích/KL):");
    var ddGroup = grpFilter.add("dropdownlist", undefined, [
        "Tất cả (Đầy đủ 31 mẫu chuẩn)",
        "100 ml/g",
        "250 ml/g",
        "500 ml/g",
        "1 lít/kg",
        "5 lít",
        "10kg",
        "20 kg"
    ]);
    ddGroup.selection = 0;
    ddGroup.preferredSize.width = 185;

    grpFilter.add("statictext", undefined, "Tìm nhanh:");
    var txtSearch = grpFilter.add("edittext", undefined, "");
    txtSearch.preferredSize.width = 180;

    var btnSaveMarginToPreset = grpFilter.add("button", undefined, "💾 Lưu Mép vào mẫu này");
    var btnAddPreset = grpFilter.add("button", undefined, "➕ Thêm mẫu");
    var btnDeletePreset = grpFilter.add("button", undefined, "🗑️ Xóa");
    var btnResetDefault = grpFilter.add("button", undefined, "↺ Khôi phục gốc");

    // Bảng rộng và cao để nhìn thấy đầy đủ các mẫu
    var listPresets = pnlPresets.add("listbox", [0, 0, 780, 250], [], {
        numberOfColumns: 4,
        showHeaders: true,
        columnTitles: ["Cột 1 (Dung tích/KL)", "Kích thước (Rộng × Cao)", "Loại bao bì", "Ghi chú & Thông số Mép riêng"],
        columnWidths: [130, 145, 200, 285]
    });

    // ------------------------------------------------------------------------
    // PHẦN GIỮA: CHIA 2 CỘT (CỘT TRÁI: THÔNG SỐ ARTBOARD, SỐ LƯỢNG & MÉP | CỘT PHẢI: MÔ PHỎNG HÌNH 1)
    // ------------------------------------------------------------------------
    var grpMiddle = win.add("group");
    grpMiddle.orientation = "row";
    grpMiddle.alignChildren = ["fill", "fill"];
    grpMiddle.spacing = 10;

    var grpLeftControls = grpMiddle.add("group");
    grpLeftControls.orientation = "column";
    grpLeftControls.alignChildren = ["fill", "top"];
    grpLeftControls.spacing = 8;

    // 2. KÍCH THƯỚC & SỐ LƯỢNG ARTBOARD CẦN TẠO
    var pnlArtboard = grpLeftControls.add("panel", undefined, "2. KÍCH THƯỚC & SỐ LƯỢNG ARTBOARD CẦN TẠO");
    pnlArtboard.orientation = "column";
    pnlArtboard.alignChildren = ["fill", "top"];
    pnlArtboard.spacing = 6;
    pnlArtboard.margins = [10, 14, 10, 10];

    var grpSize = pnlArtboard.add("group");
    grpSize.orientation = "row";
    grpSize.alignChildren = ["left", "center"];
    grpSize.spacing = 6;

    grpSize.add("statictext", undefined, "Rộng (W):");
    var txtWidth = grpSize.add("edittext", undefined, "24.5");
    txtWidth.characters = 6;

    grpSize.add("statictext", undefined, "cm   ×   Cao (H):");
    var txtHeight = grpSize.add("edittext", undefined, "8.5");
    txtHeight.characters = 6;
    grpSize.add("statictext", undefined, "cm");

    var btnSwapWH = grpSize.add("button", undefined, "⇄ Đảo Rộng/Cao");

    // Dòng chọn Số lượng Artboard + Nút chọn nhanh 1..10
    var grpCount = pnlArtboard.add("group");
    grpCount.orientation = "row";
    grpCount.alignChildren = ["left", "center"];
    grpCount.spacing = 5;

    grpCount.add("statictext", undefined, "Số lượng Artboard:");
    var txtNumArtboards = grpCount.add("edittext", undefined, "1");
    txtNumArtboards.characters = 4;

    grpCount.add("statictext", undefined, "Chọn nhanh:");
    var quickCounts = [1, 2, 3, 4, 5, 6, 8, 10];
    for (var qc = 0; qc < quickCounts.length; qc++) {
        (function (numVal) {
            var bQuick = grpCount.add("button", undefined, String(numVal));
            bQuick.preferredSize = [28, 22];
            bQuick.onClick = function () {
                txtNumArtboards.text = String(numVal);
            };
        })(quickCounts[qc]);
    }

    var grpLayoutAb = pnlArtboard.add("group");
    grpLayoutAb.orientation = "row";
    grpLayoutAb.alignChildren = ["left", "center"];
    grpLayoutAb.spacing = 6;

    grpLayoutAb.add("statictext", undefined, "Khoảng cách giữa các Artboard:");
    var txtAbGap = grpLayoutAb.add("edittext", undefined, "2.0");
    txtAbGap.characters = 4;
    grpLayoutAb.add("statictext", undefined, "cm   |   Số Artboard / 1 hàng ngang:");
    var txtAbCols = grpLayoutAb.add("edittext", undefined, "4");
    txtAbCols.characters = 3;

    var grpMode = pnlArtboard.add("group");
    grpMode.orientation = "row";
    grpMode.alignChildren = ["left", "center"];
    grpMode.spacing = 6;

    grpMode.add("statictext", undefined, "Chế độ:");
    var ddMode = grpMode.add("dropdownlist", undefined, [
        "Tạo File mới (CMYK - đơn vị cm)",
        "Thêm Artboard vào File đang mở",
        "Cập nhật lên Artboard hiện tại"
    ]);
    ddMode.selection = 0;
    ddMode.preferredSize.width = 210;

    grpMode.add("statictext", undefined, "Tên:");
    var txtAbName = grpMode.add("edittext", undefined, "500ml_Chai_tron_Couche_24.5x8.5cm");
    txtAbName.preferredSize.width = 180;

    // 3. THÔNG SỐ LƯỚI (MÉP RIÊNG & GIỮA CHIA ĐỀU)
    var pnlGrid = grpLeftControls.add("panel", undefined, "3. THÔNG SỐ LƯỚI GUIDES (MÉP RIÊNG TỪNG NHÃN & Ở GIỮA CHIA ĐỀU)");
    pnlGrid.orientation = "column";
    pnlGrid.alignChildren = ["fill", "top"];
    pnlGrid.spacing = 6;
    pnlGrid.margins = [10, 14, 10, 10];

    var grpMarginLR = pnlGrid.add("group");
    grpMarginLR.orientation = "row";
    grpMarginLR.alignChildren = ["left", "center"];
    grpMarginLR.spacing = 6;

    var lblML = grpMarginLR.add("statictext", undefined, "Mép Trái (cm):");
    lblML.preferredSize.width = 85;
    var txtMarginLeft = grpMarginLR.add("edittext", undefined, "1.0");
    txtMarginLeft.characters = 5;

    var lblMR = grpMarginLR.add("statictext", undefined, "Mép Phải (cm):");
    lblMR.preferredSize.width = 85;
    var txtMarginRight = grpMarginLR.add("edittext", undefined, "1.0");
    txtMarginRight.characters = 5;

    var chkLockLR = grpMarginLR.add("checkbox", undefined, "Khóa 2 bên bằng nhau");
    chkLockLR.value = false;

    var grpMarginTB = pnlGrid.add("group");
    grpMarginTB.orientation = "row";
    grpMarginTB.alignChildren = ["left", "center"];
    grpMarginTB.spacing = 6;

    var lblMT = grpMarginTB.add("statictext", undefined, "Mép Trên (cm):");
    lblMT.preferredSize.width = 85;
    var txtMarginTop = grpMarginTB.add("edittext", undefined, "0.6");
    txtMarginTop.characters = 5;

    var lblMB = grpMarginTB.add("statictext", undefined, "Mép Dưới (cm):");
    lblMB.preferredSize.width = 85;
    var txtMarginBottom = grpMarginTB.add("edittext", undefined, "0.6");
    txtMarginBottom.characters = 5;

    var chkLockTB = grpMarginTB.add("checkbox", undefined, "Khóa trên/dưới bằng nhau");
    chkLockTB.value = false;

    var grpCenterSplit = pnlGrid.add("group");
    grpCenterSplit.orientation = "row";
    grpCenterSplit.alignChildren = ["left", "center"];
    grpCenterSplit.spacing = 6;

    var lblCols = grpCenterSplit.add("statictext", undefined, "Chia đều ở giữa:");
    lblCols.preferredSize.width = 85;
    var txtCenterCols = grpCenterSplit.add("edittext", undefined, "3");
    txtCenterCols.characters = 4;
    grpCenterSplit.add("statictext", undefined, "cột dọc (Hình 1 = 3)");

    grpCenterSplit.add("statictext", undefined, "   |   Chia hàng ngang giữa:");
    var txtCenterRows = grpCenterSplit.add("edittext", undefined, "1");
    txtCenterRows.characters = 3;

    var grpSubOpts = pnlGrid.add("group");
    grpSubOpts.orientation = "row";
    grpSubOpts.spacing = 12;
    var chkExtendOutside = grpSubOpts.add("checkbox", undefined, "Lưới tràn ngoài Artboard (Hình 1)");
    chkExtendOutside.value = true;
    var chkSeparateLayer = grpSubOpts.add("checkbox", undefined, "Layer riêng (Luoi_Guides_BaoBi)");
    chkSeparateLayer.value = true;
    var chkClearOld = grpSubOpts.add("checkbox", undefined, "Xóa lưới cũ");
    chkClearOld.value = true;

    // ------------------------------------------------------------------------
    // CỘT PHẢI: KHUNG XEM TRƯỚC TRỰC QUAN (LIVE PREVIEW GIỐNG HÌNH 1)
    // ------------------------------------------------------------------------
    var pnlPreview = grpMiddle.add("panel", undefined, "XEM TRƯỚC BỐ CỤC LƯỚI (HÌNH 1)");
    pnlPreview.orientation = "column";
    pnlPreview.alignChildren = ["center", "top"];
    pnlPreview.spacing = 6;
    pnlPreview.margins = [10, 14, 10, 10];

    var previewCanvas = pnlPreview.add("group");
    previewCanvas.preferredSize = [260, 195];

    var lblCalcSummary = pnlPreview.add("statictext", undefined, "", { multiline: true });
    lblCalcSummary.preferredSize = [260, 58];

    previewCanvas.onDraw = function () {
        var g = this.graphics;
        var cw = this.size[0];
        var ch = this.size[1];

        var bgBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.33, 0.33, 0.33, 1]);
        g.rectPath(0, 0, cw, ch);
        g.fillPath(bgBrush);

        var wCm = Math.max(0.1, parseNum(txtWidth.text, 24.5));
        var hCm = Math.max(0.1, parseNum(txtHeight.text, 8.5));
        var mL = Math.max(0, parseNum(txtMarginLeft.text, 1.0));
        var mR = Math.max(0, parseNum(txtMarginRight.text, 1.0));
        var mT = Math.max(0, parseNum(txtMarginTop.text, 0.6));
        var mB = Math.max(0, parseNum(txtMarginBottom.text, 0.6));
        var cols = Math.max(1, Math.min(20, Math.floor(parseNum(txtCenterCols.text, 3))));
        var rows = Math.max(1, Math.min(20, Math.floor(parseNum(txtCenterRows.text, 1))));

        var pad = 22;
        var availW = cw - pad * 2;
        var availH = ch - pad * 2;
        var scale = Math.min(availW / wCm, availH / hCm);

        var abW = wCm * scale;
        var abH = hCm * scale;
        var abX = (cw - abW) / 2;
        var abY = (ch - abH) / 2;

        var whiteBrush = g.newBrush(g.BrushType.SOLID_COLOR, [1, 1, 1, 1]);
        var blackPen = g.newPen(g.PenType.SOLID_COLOR, [0.1, 0.1, 0.1, 1], 1);
        g.rectPath(abX, abY, abW, abH);
        g.fillPath(whiteBrush);
        g.strokePath(blackPen);

        var cyanPen = g.newPen(g.PenType.SOLID_COLOR, [0.0, 0.88, 1.0, 1], 1);
        var ext = chkExtendOutside.value;
        var gx1 = ext ? 0 : abX;
        var gx2 = ext ? cw : (abX + abW);
        var gy1 = ext ? 0 : abY;
        var gy2 = ext ? ch : (abY + abH);

        function drawPreviewLine(x1, y1, x2, y2) {
            g.newPath();
            g.moveTo(x1, y1);
            g.lineTo(x2, y2);
            g.strokePath(cyanPen);
        }

        var yTop = abY + mT * scale;
        var yBot = abY + abH - mB * scale;
        if (mT > 0 && mT < hCm) drawPreviewLine(gx1, yTop, gx2, yTop);
        if (mB > 0 && mB < hCm) drawPreviewLine(gx1, yBot, gx2, yBot);

        var xLeft = abX + mL * scale;
        var xRight = abX + abW - mR * scale;
        if (mL > 0 && mL < wCm) drawPreviewLine(xLeft, gy1, xLeft, gy2);
        if (mR > 0 && mR < wCm) drawPreviewLine(xRight, gy1, xRight, gy2);

        var innerW = xRight - xLeft;
        if (cols > 1 && innerW > 2) {
            var stepX = innerW / cols;
            for (var c = 1; c < cols; c++) {
                var xm = xLeft + stepX * c;
                drawPreviewLine(xm, gy1, xm, gy2);
            }
        }

        var innerH = yBot - yTop;
        if (rows > 1 && innerH > 2) {
            var stepY = innerH / rows;
            for (var r = 1; r < rows; r++) {
                var ym = yTop + stepY * r;
                drawPreviewLine(gx1, ym, gx2, ym);
            }
        }
    };

    // ------------------------------------------------------------------------
    // PHẦN 4: CÁC NÚT THỰC THI CHÍNH & TỰ ĐỘNG TẮT BẢNG
    // ------------------------------------------------------------------------
    var grpBottomBar = win.add("group");
    grpBottomBar.orientation = "row";
    grpBottomBar.alignChildren = ["fill", "center"];
    grpBottomBar.spacing = 10;

    var chkAutoClose = grpBottomBar.add("checkbox", undefined, "Tự tắt bảng ngay sau khi Tạo xong");
    chkAutoClose.value = true; // Mặc định tự tắt theo yêu cầu người dùng

    var btnCreateAll = grpBottomBar.add("button", undefined, "🚀 TẠO ARTBOARD & KẺ LƯỚI NGAY");
    btnCreateAll.preferredSize = [290, 40];

    var btnOnlyUpdateGrid = grpBottomBar.add("button", undefined, "🔄 Chỉ Cập Nhật Lại Lưới");
    btnOnlyUpdateGrid.preferredSize = [180, 40];

    var btnClose = grpBottomBar.add("button", undefined, "Đóng");
    btnClose.preferredSize = [70, 40];

    // ========================================================================
    // SỰ KIỆN & CẬP NHẬT TRỰC TIẾP
    // ========================================================================
    function refreshPreviewAndSummary() {
        var w = parseNum(txtWidth.text, 0);
        var h = parseNum(txtHeight.text, 0);
        var mL = parseNum(txtMarginLeft.text, 0);
        var mR = parseNum(txtMarginRight.text, 0);
        var mT = parseNum(txtMarginTop.text, 0);
        var mB = parseNum(txtMarginBottom.text, 0);
        var cols = Math.max(1, Math.floor(parseNum(txtCenterCols.text, 3)));
        var numAb = Math.max(1, Math.floor(parseNum(txtNumArtboards.text, 1)));

        var innerW = roundCm(w - mL - mR);
        var innerH = roundCm(h - mT - mB);
        var eachColW = cols > 0 ? roundCm(innerW / cols) : innerW;

        if (innerW <= 0 || innerH <= 0) {
            lblCalcSummary.text = "⚠️ Tổng 2 mép đang lớn hơn Artboard!\nVui lòng giảm số đo Mép.";
        } else {
            lblCalcSummary.text =
                "• Tạo: " + numAb + " Artboard (" + w + " × " + h + " cm)\n" +
                "• Vùng giữa: " + innerW + " × " + innerH + " cm\n" +
                "• Chia đều " + cols + " cột ➔ Mỗi cột rộng: " + eachColW + " cm";
        }

        try {
            previewCanvas.hide();
            previewCanvas.show();
        } catch (e) {}
    }

    function populateList() {
        listPresets.removeAll();
        filteredPresets = [];

        var selectedGroup = ddGroup.selection ? ddGroup.selection.text : "Tất cả";
        var keyword = txtSearch.text ? txtSearch.text.toLowerCase().replace(/^\s+|\s+$/g, "") : "";

        for (var i = 0; i < allPresets.length; i++) {
            var item = allPresets[i];
            var matchGroup = (selectedGroup.indexOf("Tất cả") === 0) || (item.group === selectedGroup);
            var matchSearch = true;
            if (keyword !== "") {
                var haystack = (item.group + " " + item.sizeText + " " + item.type + " " + item.note).toLowerCase();
                matchSearch = (haystack.indexOf(keyword) !== -1);
            }

            if (matchGroup && matchSearch) {
                filteredPresets.push(item);
                var row = listPresets.add("item", item.group);
                row.subItems[0].text = item.sizeText;
                row.subItems[1].text = item.type;
                var marginInfo = "[Mép T:" + item.mL + " P:" + item.mR + " Tr:" + item.mT + " D:" + item.mB + " | Chia:" + (item.cols || 3) + "]";
                row.subItems[2].text = (item.note ? (item.note + " ") : "") + marginInfo;
            }
        }

        if (filteredPresets.length > 0) {
            listPresets.selection = 0;
        }
    }

    listPresets.onChange = function () {
        if (!listPresets.selection) return;
        var idx = listPresets.selection.index;
        var p = filteredPresets[idx];
        if (!p) return;

        txtWidth.text = String(p.w);
        txtHeight.text = String(p.h);
        txtMarginLeft.text = String(p.mL !== undefined ? p.mL : 1.0);
        txtMarginRight.text = String(p.mR !== undefined ? p.mR : 1.0);
        txtMarginTop.text = String(p.mT !== undefined ? p.mT : 0.6);
        txtMarginBottom.text = String(p.mB !== undefined ? p.mB : 0.6);
        txtCenterCols.text = String(p.cols !== undefined ? p.cols : 3);

        var cleanGroup = p.group.replace(/\s+/g, "");
        var cleanType = p.type.replace(/[\/\\]/g, "_").replace(/\s+/g, "_");
        txtAbName.text = cleanGroup + "_" + cleanType + "_" + p.w + "x" + p.h + "cm";

        refreshPreviewAndSummary();
    };

    listPresets.onDoubleClick = function () {
        executeGeneration(false);
    };

    ddGroup.onChange = populateList;
    txtSearch.onChanging = populateList;

    txtMarginLeft.onChanging = function () {
        if (chkLockLR.value) txtMarginRight.text = txtMarginLeft.text;
        refreshPreviewAndSummary();
    };
    txtMarginRight.onChanging = function () {
        if (chkLockLR.value) txtMarginLeft.text = txtMarginRight.text;
        refreshPreviewAndSummary();
    };
    chkLockLR.onClick = function () {
        if (chkLockLR.value) {
            txtMarginRight.text = txtMarginLeft.text;
            refreshPreviewAndSummary();
        }
    };

    txtMarginTop.onChanging = function () {
        if (chkLockTB.value) txtMarginBottom.text = txtMarginTop.text;
        refreshPreviewAndSummary();
    };
    txtMarginBottom.onChanging = function () {
        if (chkLockTB.value) txtMarginTop.text = txtMarginBottom.text;
        refreshPreviewAndSummary();
    };
    chkLockTB.onClick = function () {
        if (chkLockTB.value) {
            txtMarginBottom.text = txtMarginTop.text;
            refreshPreviewAndSummary();
        }
    };

    txtWidth.onChanging = refreshPreviewAndSummary;
    txtHeight.onChanging = refreshPreviewAndSummary;
    txtNumArtboards.onChanging = refreshPreviewAndSummary;
    txtCenterCols.onChanging = refreshPreviewAndSummary;
    txtCenterRows.onChanging = refreshPreviewAndSummary;
    chkExtendOutside.onClick = refreshPreviewAndSummary;

    btnSwapWH.onClick = function () {
        var tmp = txtWidth.text;
        txtWidth.text = txtHeight.text;
        txtHeight.text = tmp;
        refreshPreviewAndSummary();
    };

    btnSaveMarginToPreset.onClick = function () {
        if (!listPresets.selection) {
            alert("Vui lòng chọn một mẫu trong bảng trước khi lưu thông số mép!");
            return;
        }
        var idx = listPresets.selection.index;
        var p = filteredPresets[idx];
        if (!p) return;

        p.w = parseNum(txtWidth.text, p.w);
        p.h = parseNum(txtHeight.text, p.h);
        p.sizeText = p.w + "x" + p.h + " cm";
        p.mL = parseNum(txtMarginLeft.text, 1.0);
        p.mR = parseNum(txtMarginRight.text, 1.0);
        p.mT = parseNum(txtMarginTop.text, 0.6);
        p.mB = parseNum(txtMarginBottom.text, 0.6);
        p.cols = Math.max(1, Math.floor(parseNum(txtCenterCols.text, 3)));

        savePresetsToFile(allPresets);
        populateList();
        listPresets.selection = idx;
        alert("Đã lưu thông số kích thước & 4 mép riêng cho mẫu:\n[" + p.group + "] " + p.type + " (" + p.sizeText + ")");
    };

    btnAddPreset.onClick = function () {
        var dlg = new Window("dialog", "Thêm Mẫu Kích Thước Mới Vào Bảng");
        dlg.orientation = "column";
        dlg.alignChildren = ["fill", "top"];
        dlg.spacing = 8;
        dlg.margins = 14;

        var g1 = dlg.add("group");
        g1.add("statictext", undefined, "Dung tích / KL (Cột 1):");
        var inGroup = g1.add("edittext", undefined, ddGroup.selection && ddGroup.selection.index > 0 ? ddGroup.selection.text : "500 ml/g");
        inGroup.characters = 18;

        var g2 = dlg.add("group");
        g2.add("statictext", undefined, "Loại bao bì:");
        var inType = g2.add("edittext", undefined, "Chai / Decal");
        inType.characters = 25;

        var g3 = dlg.add("group");
        g3.add("statictext", undefined, "Ghi chú:");
        var inNote = g3.add("edittext", undefined, "");
        inNote.characters = 28;

        var gBtns = dlg.add("group");
        gBtns.alignment = "right";
        gBtns.add("button", undefined, "Lưu mẫu mới", { name: "ok" });
        gBtns.add("button", undefined, "Hủy", { name: "cancel" });

        if (dlg.show() === 1) {
            var wVal = parseNum(txtWidth.text, 15);
            var hVal = parseNum(txtHeight.text, 22);
            var newItem = {
                id: "custom_" + (new Date().getTime()),
                group: inGroup.text || "Khác",
                sizeText: wVal + "x" + hVal + " cm",
                w: wVal,
                h: hVal,
                type: inType.text || "Nhãn",
                note: inNote.text || "",
                mL: parseNum(txtMarginLeft.text, 1.0),
                mR: parseNum(txtMarginRight.text, 1.0),
                mT: parseNum(txtMarginTop.text, 0.6),
                mB: parseNum(txtMarginBottom.text, 0.6),
                cols: Math.max(1, Math.floor(parseNum(txtCenterCols.text, 3)))
            };
            allPresets.push(newItem);
            savePresetsToFile(allPresets);
            populateList();
            listPresets.selection = filteredPresets.length - 1;
        }
    };

    btnDeletePreset.onClick = function () {
        if (!listPresets.selection) return;
        var idx = listPresets.selection.index;
        var p = filteredPresets[idx];
        if (!p) return;

        if (confirm("Bạn có chắc muốn xóa mẫu [" + p.group + " - " + p.sizeText + " - " + p.type + "] khỏi bảng?")) {
            for (var i = 0; i < allPresets.length; i++) {
                if (allPresets[i].id === p.id) {
                    allPresets.splice(i, 1);
                    break;
                }
            }
            savePresetsToFile(allPresets);
            populateList();
        }
    };

    btnResetDefault.onClick = function () {
        if (confirm("Khôi phục lại danh sách 31 kích thước gốc từ bảng quy cách?")) {
            if (SETTINGS_FILE.exists) SETTINGS_FILE.remove();
            allPresets = loadPresetsFromFile();
            populateList();
        }
    };

    function executeGeneration(onlyGridUpdate) {
        var wCm = parseNum(txtWidth.text, 0);
        var hCm = parseNum(txtHeight.text, 0);
        if (!onlyGridUpdate && (wCm <= 0 || hCm <= 0)) {
            alert("Kích thước Chiều Rộng và Chiều Cao phải lớn hơn 0 cm!");
            return;
        }

        var numArtboards = Math.max(1, Math.min(100, Math.floor(parseNum(txtNumArtboards.text, 1))));
        var abGapCm = Math.max(0.2, parseNum(txtAbGap.text, 2.0));
        var abColsPerRow = Math.max(1, Math.floor(parseNum(txtAbCols.text, 4)));

        var mLeftCm = parseNum(txtMarginLeft.text, 0);
        var mRightCm = parseNum(txtMarginRight.text, 0);
        var mTopCm = parseNum(txtMarginTop.text, 0);
        var mBotCm = parseNum(txtMarginBottom.text, 0);
        var centerCols = Math.max(1, Math.floor(parseNum(txtCenterCols.text, 3)));
        var centerRows = Math.max(1, Math.floor(parseNum(txtCenterRows.text, 1)));

        var modeCode = "NEW_DOC";
        if (onlyGridUpdate) {
            modeCode = "UPDATE_CURRENT";
        } else if (ddMode.selection) {
            if (ddMode.selection.index === 1) modeCode = "ADD_AB";
            else if (ddMode.selection.index === 2) modeCode = "UPDATE_CURRENT";
        }

        var abName = txtAbName.text ? txtAbName.text : ("Artboard_" + wCm + "x" + hCm + "cm");

        var params = {
            mode: modeCode,
            onlyGrid: onlyGridUpdate ? true : false,
            wCm: wCm,
            hCm: hCm,
            numArtboards: numArtboards,
            abGapCm: abGapCm,
            abColsPerRow: abColsPerRow,
            abName: abName,
            docName: abName,
            mLeftCm: mLeftCm,
            mRightCm: mRightCm,
            mTopCm: mTopCm,
            mBotCm: mBotCm,
            centerCols: centerCols,
            centerRows: centerRows,
            extendOutside: chkExtendOutside.value,
            useSeparateLayer: chkSeparateLayer.value,
            clearOldGuides: chkClearOld.value
        };

        runIllustratorAction(params);

        // Tự động tắt bảng ngay sau khi tạo xong!
        if (chkAutoClose.value && !onlyGridUpdate) {
            win.close();
        }
    }

    btnCreateAll.onClick = function () {
        executeGeneration(false);
    };

    btnOnlyUpdateGrid.onClick = function () {
        executeGeneration(true);
    };

    btnClose.onClick = function () {
        win.close();
    };

    populateList();
    refreshPreviewAndSummary();

    win.center();
    win.show();
}

showBaoBiArtboardGridUI("dialog");
