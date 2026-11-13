# Tạo Artboard & Lưới Bao Bì Pro — Adobe Illustrator

Panel cho Adobe Illustrator: tạo Artboard theo 31 kích thước bao bì chuẩn, chọn số lượng Artboard, kẻ lưới Guides (mép riêng + chia đều vùng giữa).

## ⬇ Tải & cài đặt (người dùng)
1. Tải **[Artboard_Luoi_BaoBi_Pro.zip](https://github.com/lkey124/panel-bao-b-/raw/main/Artboard_Luoi_BaoBi_Pro.zip)**
2. Giải nén → tắt Illustrator → nhấp đúp `CAI_DAT.bat`
3. Mở Illustrator → **Window › Extensions › Tạo Artboard & Lưới Bao Bì**

Khi có bản mới, Panel tự hiện nút **🔔 Cập nhật** — bấm là xong, không cần cài lại.

## 🛠 Phát hành bản mới (tác giả)
1. Sửa code trong thư mục `extension/` (hoặc `script/`)
2. Nhấp đúp `PHAT_HANH.bat` → nhập số phiên bản + ghi chú
3. Công cụ tự: cập nhật `version.json`, đóng gói ZIP, push lên GitHub

## Cấu trúc
| Thư mục | Nội dung |
|---|---|
| `extension/` | Mã nguồn Panel (CEP) — file người dùng nhận khi cập nhật |
| `script/` | Bản Script cho menu File › Scripts |
| `installer/` | Bộ cài Windows |
| `tools/publish.ps1` | Công cụ phát hành |
| `version.json` | Thông tin phiên bản mới nhất (Panel đọc file này) |
