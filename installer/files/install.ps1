# ============================================================================
#  TRÌNH CÀI ĐẶT: TẠO ARTBOARD & LƯỚI BAO BÌ PRO - ADOBE ILLUSTRATOR
# ============================================================================
$ErrorActionPreference = "SilentlyContinue"
$Host.UI.RawUI.WindowTitle = "Cai dat - Tao Artboard & Luoi Bao Bi Pro"

$ExtId   = "com.baobi.artboardgrid"
$SrcRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$SrcExt  = Join-Path $SrcRoot $ExtId
$SrcJsx  = Join-Path $SrcRoot "script\Tao_Artboard_Va_Luoi_BaoBi.jsx"

function Line { Write-Host ("=" * 70) -ForegroundColor DarkGray }
function Ok($m)   { Write-Host "  [OK]  $m" -ForegroundColor Green }
function Warn($m) { Write-Host "  [!]   $m" -ForegroundColor Yellow }
function Err($m)  { Write-Host "  [X]   $m" -ForegroundColor Red }

Clear-Host
Line
Write-Host "   TẠO ARTBOARD & LƯỚI BAO BÌ PRO  -  Trình cài đặt cho Adobe Illustrator" -ForegroundColor Cyan
Line
Write-Host ""

if (-not (Test-Path $SrcExt)) {
    Err "Không tìm thấy thư mục '$ExtId'. Hãy giải nén đầy đủ file ZIP trước khi cài!"
    exit 1
}

# 1. Kiểm tra Illustrator đang chạy
$ai = Get-Process -Name "Illustrator" -ErrorAction SilentlyContinue
if ($ai) {
    Warn "Adobe Illustrator đang mở. Vui lòng LƯU file và TẮT Illustrator trước khi cài."
    Read-Host "  Nhấn Enter sau khi đã tắt Illustrator để tiếp tục"
}

# 2. Cài Extension (Panel) vào thư mục CEP của người dùng (không cần quyền Admin)
Write-Host "1) Cài đặt Panel Extension..." -ForegroundColor White
$CepDir = Join-Path $env:APPDATA "Adobe\CEP\extensions"
$DstExt = Join-Path $CepDir $ExtId
New-Item -ItemType Directory -Force -Path $CepDir | Out-Null
if (Test-Path $DstExt) { Remove-Item -Path $DstExt -Recurse -Force }
Copy-Item -Path $SrcExt -Destination $DstExt -Recurse -Force
if (Test-Path (Join-Path $DstExt "CSXS\manifest.xml")) { Ok "Đã cài Panel vào: $DstExt" }
else { Err "Cài Panel thất bại!" }

# 3. Bật chế độ cho phép Extension (PlayerDebugMode) cho mọi phiên bản CEP
Write-Host ""
Write-Host "2) Kích hoạt quyền chạy Extension cho Illustrator..." -ForegroundColor White
for ($i = 6; $i -le 13; $i++) {
    $reg = "HKCU:\Software\Adobe\CSXS.$i"
    if (-not (Test-Path $reg)) { New-Item -Path $reg -Force | Out-Null }
    Set-ItemProperty -Path $reg -Name "PlayerDebugMode" -Value "1" -Type String
}
Ok "Đã kích hoạt (CSXS 6 - 13, hỗ trợ Illustrator CC 2015 đến 2025+)"

# 4. Tìm mọi bản Illustrator đã cài để chép thêm Script vào menu File > Scripts
Write-Host ""
Write-Host "3) Tìm Adobe Illustrator trên máy..." -ForegroundColor White
$aiDirs = New-Object System.Collections.Generic.List[string]

# 4a. Từ Registry
$regRoots = @(
  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*",
  "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
  "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*"
)
foreach ($r in $regRoots) {
  Get-ItemProperty $r | Where-Object { $_.DisplayName -like "*Illustrator*" -and $_.InstallLocation } |
    ForEach-Object { if (Test-Path $_.InstallLocation) { $aiDirs.Add($_.InstallLocation.TrimEnd('\')) } }
}

# 4b. Quét các ổ đĩa (thư mục Adobe phổ biến, bản Portable)
Get-PSDrive -PSProvider FileSystem | ForEach-Object {
  $root = $_.Root
  foreach ($base in @("Program Files\Adobe", "Program Files (x86)\Adobe", "Adobe", "adobe", "Program Files")) {
    $p = Join-Path $root $base
    if (Test-Path $p) {
      Get-ChildItem -Path $p -Directory -Filter "Adobe Illustrator*" | ForEach-Object { $aiDirs.Add($_.FullName) }
    }
  }
}

$aiDirs = $aiDirs | Sort-Object -Unique
$scriptCount = 0
foreach ($d in $aiDirs) {
  $presets = Join-Path $d "Presets"
  if (-not (Test-Path $presets)) { continue }
  Get-ChildItem -Path $presets -Directory | ForEach-Object {
    $sd = Join-Path $_.FullName "Scripts"
    if (Test-Path $sd) {
      Copy-Item -Path $SrcJsx -Destination $sd -Force
      if (Test-Path (Join-Path $sd "Tao_Artboard_Va_Luoi_BaoBi.jsx")) {
        Ok "Script -> $sd"
        $scriptCount++
      } else {
        Warn "Không ghi được vào $sd (cần chạy với quyền Administrator)"
      }
    }
  }
}
if ($aiDirs.Count -eq 0) { Warn "Không tìm thấy thư mục Illustrator. Panel vẫn dùng bình thường." }

# 5. Hoàn tất
Write-Host ""
Line
Write-Host "   CÀI ĐẶT HOÀN TẤT!" -ForegroundColor Green
Line
Write-Host ""
Write-Host "  Cách mở:" -ForegroundColor White
Write-Host "   1. Khởi động Adobe Illustrator"
Write-Host "   2. Vào menu:  Window  >  Extensions  >  Tạo Artboard & Lưới Bao Bì" -ForegroundColor Cyan
if ($scriptCount -gt 0) {
Write-Host "      (hoặc File  >  Scripts  >  Tao_Artboard_Va_Luoi_BaoBi)" -ForegroundColor Cyan
}
Write-Host ""
