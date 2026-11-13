/**
 * HOST EXTENDSCRIPT CHO ADOBE ILLUSTRATOR (CEP PANEL: TẠO ARTBOARD & LƯỚI BAO BÌ)
 */

function createBaoBiArtboardAndGrid(
    mode,
    onlyGrid,
    wCm,
    hCm,
    numArtboards,
    abGapCm,
    abColsPerRow,
    abName,
    mLeftCm,
    mRightCm,
    mTopCm,
    mBotCm,
    centerCols,
    centerRows,
    extendOutside,
    useSeparateLayer,
    clearOldGuides
) {
    try {
        var CM_TO_PT = 72.0 / 2.54;
        var wPt = Number(wCm) * CM_TO_PT;
        var hPt = Number(hCm) * CM_TO_PT;
        var gapPt = Math.max(0.5, Number(abGapCm) || 2.0) * CM_TO_PT;
        var numAb = Math.max(1, Math.min(100, Math.floor(Number(numArtboards) || 1)));
        var colsPerRow = Math.max(1, Math.floor(Number(abColsPerRow) || 4));
        var doc = null;
        var createdIndices = [];
        var safeName = abName ? String(abName) : ("BaoBi_" + wCm + "x" + hCm + "cm");

        if (onlyGrid || mode === "UPDATE_CURRENT") {
            if (app.documents.length === 0) return '{"error":"Chưa có file nào đang mở!"}';
            doc = app.activeDocument;
            var curIdx = doc.artboards.getActiveArtboardIndex();
            var curAb = doc.artboards[curIdx];
            var curRect = curAb.artboardRect;
            if (!onlyGrid) {
                curAb.artboardRect = [curRect[0], curRect[1], curRect[0] + wPt, curRect[1] - hPt];
                if (safeName) curAb.name = safeName;
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
            doc = app.documents.addDocument(DocumentPresetType.Print, preset);

            var firstAb = doc.artboards[0];
            var firstRect = firstAb.artboardRect;
            var startX = firstRect[0];
            var startY = firstRect[1];
            firstAb.name = numAb > 1 ? (safeName + "_01") : safeName;
            createdIndices.push(0);

            for (var i = 1; i < numAb; i++) {
                var cIdx = i % colsPerRow;
                var rIdx = Math.floor(i / colsPerRow);
                var abL = startX + cIdx * (wPt + gapPt);
                var abT = startY - rIdx * (hPt + gapPt);
                var rectI = [abL, abT, abL + wPt, abT - hPt];
                var addedAb = doc.artboards.add(rectI);
                var suffix = (i + 1) < 10 ? ("0" + (i + 1)) : String(i + 1);
                addedAb.name = safeName + "_" + suffix;
                createdIndices.push(doc.artboards.length - 1);
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
                    extX = Math.max(actualW, actualH) * 2.5 + 1500;
                    extY = extX;
                } else {
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

            var mTopPt = Number(mTopCm) * CM_TO_PT;
            var mBotPt = Number(mBotCm) * CM_TO_PT;
            if (mTopPt > 0 && mTopPt < actualH) {
                var yTop = top - mTopPt;
                drawGuide(left - extX, yTop, right + extX, yTop, "Mep_Tren_" + mTopCm + "cm");
            }
            if (mBotPt > 0 && mBotPt < actualH) {
                var yBot = bottom + mBotPt;
                drawGuide(left - extX, yBot, right + extX, yBot, "Mep_Duoi_" + mBotCm + "cm");
            }

            var mLeftPt = Number(mLeftCm) * CM_TO_PT;
            var mRightPt = Number(mRightCm) * CM_TO_PT;
            var xLeftGuide = left + mLeftPt;
            var xRightGuide = right - mRightPt;

            if (mLeftPt > 0 && mLeftPt < actualW) {
                drawGuide(xLeftGuide, top + extY, xLeftGuide, bottom - extY, "Mep_Trai_" + mLeftCm + "cm");
            }
            if (mRightPt > 0 && mRightPt < actualW) {
                drawGuide(xRightGuide, top + extY, xRightGuide, bottom - extY, "Mep_Phai_" + mRightCm + "cm");
            }

            var innerWidthPt = xRightGuide - xLeftGuide;
            var cols = Math.floor(Number(centerCols) || 3);
            if (cols > 1 && innerWidthPt > 0) {
                var stepPt = innerWidthPt / cols;
                for (var c = 1; c < cols; c++) {
                    var xMid = xLeftGuide + stepPt * c;
                    drawGuide(xMid, top + extY, xMid, bottom - extY, "Chia_Giua_" + c + "_" + cols);
                }
            }

            var innerHeightPt = (top - mTopPt) - (bottom + mBotPt);
            var rows = Math.floor(Number(centerRows) || 1);
            if (rows > 1 && innerHeightPt > 0) {
                var stepRowPt = innerHeightPt / rows;
                for (var r = 1; r < rows; r++) {
                    var yMid = (top - mTopPt) - stepRowPt * r;
                    drawGuide(left - extX, yMid, right + extX, yMid, "Chia_Hang_Ngang_" + r + "_" + rows);
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
        var msg = String(err.message || err).replace(/"/g, '\\"').replace(/\r?\n/g, " ");
        return '{"error":"' + msg + '"}';
    }
}

function clearCurrentArtboardGuides() {
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
        var msg = String(err.message || err).replace(/"/g, '\\"').replace(/\r?\n/g, " ");
        return '{"error":"' + msg + '"}';
    }
}
