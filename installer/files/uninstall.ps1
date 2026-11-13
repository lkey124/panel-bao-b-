# ============================================================================
#  GỠ CÀI ĐẶT: TẠO ARTBOARD & LƯỚI BAO BÌ PRO
# ============================================================================
$ErrorActionPreference = "SilentlyContinue"
$ExtId = "com.baobi.artboardgrid"

Write-Host "Đang gỡ cài đặt Tạo Artboard & Lưới Bao Bì Pro..." -ForegroundColor Cyan

$DstExt = Join-Path $env:APPDATA "Adobe\CEP\extensions\$ExtId"
if (Test-Path $DstExt) { Remove-Item $DstExt -Recurse -Force; Write-Host "  [OK] Đã xóa Panel" -ForegroundColor Green }

Get-PSDrive -PSProvider FileSystem | ForEach-Object {
  $root = $_.Root
  foreach ($base in @("Program Files\Adobe", "Program Files (x86)\Adobe", "Adobe", "adobe")) {
    $p = Join-Path $root $base
    if (Test-Path $p) {
      Get-ChildItem -Path $p -Directory -Filter "Adobe Illustrator*" | ForEach-Object {
        Get-ChildItem -Path (Join-Path $_.FullName "Presets") -Recurse -Filter "Tao_Artboard_Va_Luoi_BaoBi.jsx" |
          ForEach-Object { Remove-Item $_.FullName -Force; Write-Host "  [OK] Đã xóa $($_.FullName)" -ForegroundColor Green }
      }
    }
  }
}

Write-Host ""
Write-Host "Gỡ cài đặt hoàn tất. Khởi động lại Illustrator." -ForegroundColor Green
