# ============================================================================
#  CÔNG CỤ PHÁT HÀNH PHIÊN BẢN MỚI - TẠO ARTBOARD & LƯỚI BAO BÌ PRO
#  Dùng: nhấp đúp PHAT_HANH.bat ở thư mục gốc repo
#  Việc làm: tăng version -> tạo version.json -> đóng gói bộ cài ZIP -> push GitHub
# ============================================================================
param(
  [string]$Version = "",
  [string]$Notes = "",
  [switch]$NoPush
)
$ErrorActionPreference = "Stop"
$Repo   = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$ExtDir = Join-Path $Repo "extension"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function ReadU($p) { [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8) }
function WriteU($p, $s) { [IO.File]::WriteAllText($p, $s, $Utf8NoBom) }

# --- 1. Phiên bản hiện tại ---
$updPath = Join-Path $ExtDir "updater.js"
$upd = ReadU $updPath
$cur = [regex]::Match($upd, 'const APP_VERSION = "([0-9.]+)"').Groups[1].Value
$parts = $cur.Split('.') | ForEach-Object { [int]$_ }
$suggest = "{0}.{1}.{2}" -f $parts[0], $parts[1], ($parts[2] + 1)

Write-Host ""
Write-Host "=== PHÁT HÀNH PHIÊN BẢN MỚI ===" -ForegroundColor Cyan
Write-Host "Phiên bản hiện tại: v$cur"
if (-not $Version) {
  $Version = Read-Host "Nhập phiên bản mới (Enter = $suggest)"
  if (-not $Version) { $Version = $suggest }
}
if ($Version -notmatch '^\d+\.\d+\.\d+$') { throw "Phiên bản phải có dạng số.số.số (vd 2.1.1)" }
if (-not $Notes) {
  Write-Host "Nhập ghi chú thay đổi (mỗi dòng 1 ý, để trống + Enter để kết thúc):"
  $lines = @()
  while ($true) { $l = Read-Host " -"; if (-not $l) { break }; $lines += "• $l" }
  $Notes = ($lines -join "`n")
  if (-not $Notes) { $Notes = "• Cải thiện và sửa lỗi." }
}

# --- 2. Cập nhật số phiên bản trong code ---
$upd = [regex]::Replace($upd, 'const APP_VERSION = "[0-9.]+"', "const APP_VERSION = `"$Version`"")
WriteU $updPath $upd

$manPath = Join-Path $ExtDir "CSXS\manifest.xml"
$man = ReadU $manPath
$oldManHash = (Get-FileHash $manPath -Algorithm SHA256).Hash
$man = [regex]::Replace($man, 'ExtensionBundleVersion="[0-9.]+"', "ExtensionBundleVersion=`"$Version`"")
$man = [regex]::Replace($man, '(<Extension Id="[^"]+" Version=")[0-9.]+(")', "`${1}$Version`${2}")
WriteU $manPath $man

# --- 3. Danh sách file & phát hiện thay đổi manifest (cần khởi động lại AI) ---
$files = Get-ChildItem $ExtDir -Recurse -File | Where-Object { $_.Name -notlike ".*" } |
  ForEach-Object { $_.FullName.Substring($ExtDir.Length + 1).Replace('\', '/') } | Sort-Object

# Chỉ so phần cấu trúc manifest (bỏ qua số version) để biết có cần restart không
function ManCore($s) { [regex]::Replace($s, 'Version="[0-9.]+"', 'Version=""') }
$verJsonPath = Join-Path $Repo "version.json"
$restart = $false
$coreHash = [BitConverter]::ToString((New-Object Security.Cryptography.SHA256Managed).ComputeHash([Text.Encoding]::UTF8.GetBytes((ManCore $man)))).Replace("-","")
if (Test-Path $verJsonPath) {
  $prev = (ReadU $verJsonPath) | ConvertFrom-Json
  if ($prev.manifestCore -and $prev.manifestCore -ne $coreHash) { $restart = $true }
}

$info = [ordered]@{
  version         = $Version
  date            = (Get-Date -Format "yyyy-MM-dd HH:mm")
  notes           = $Notes
  restartRequired = $restart
  manifestCore    = $coreHash
  script          = "script/Tao_Artboard_Va_Luoi_BaoBi.jsx"
  installer       = "Artboard_Luoi_BaoBi_Pro.zip"
  files           = @($files)
}
WriteU $verJsonPath ($info | ConvertTo-Json -Depth 5)
Write-Host "✓ version.json -> v$Version (restartRequired=$restart)" -ForegroundColor Green

# --- 4. Đóng gói bộ cài ZIP cho người dùng mới ---
$tmp = Join-Path $env:TEMP ("baobi_pkg_" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path "$tmp\files\script" | Out-Null
Copy-Item "$Repo\installer\*" $tmp -Recurse -Force
Copy-Item $ExtDir "$tmp\files\com.baobi.artboardgrid" -Recurse -Force
Copy-Item "$Repo\script\Tao_Artboard_Va_Luoi_BaoBi.jsx" "$tmp\files\script\" -Force
$hd = Join-Path $tmp "HUONG_DAN.txt"
$hdTxt = [regex]::Replace((ReadU $hd), 'Phiên bản [0-9.]+', "Phiên bản $Version")
[IO.File]::WriteAllText($hd, $hdTxt, (New-Object System.Text.UTF8Encoding($true)))
$zip = Join-Path $Repo "Artboard_Luoi_BaoBi_Pro.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path "$tmp\*" -DestinationPath $zip -Force
Remove-Item $tmp -Recurse -Force
Write-Host "✓ Bộ cài: $zip" -ForegroundColor Green

# --- 5. Đồng bộ sang Illustrator trên máy bạn (để tự dùng/test) ---
$local = Join-Path $env:APPDATA "Adobe\CEP\extensions\com.baobi.artboardgrid"
if (Test-Path (Split-Path $local)) {
  if (Test-Path $local) { Remove-Item $local -Recurse -Force }
  Copy-Item $ExtDir $local -Recurse -Force
  Write-Host "✓ Đã cập nhật Panel trên máy này" -ForegroundColor Green
}

# --- 6. Đẩy lên GitHub ---
if (-not $NoPush) {
  Push-Location $Repo
  try {
    git add -A
    git commit -m "Phát hành v$Version" | Out-Null
    git push origin main
    if ($LASTEXITCODE -ne 0) { throw "git push thất bại" }
    Write-Host ""
    Write-Host "🚀 ĐÃ PHÁT HÀNH v$Version! Người dùng sẽ thấy nút 'Cập nhật' khi mở Panel (sau ~5 phút)." -ForegroundColor Cyan
  } finally { Pop-Location }
}
