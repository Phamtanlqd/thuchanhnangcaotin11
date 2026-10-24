# Bài 8 – Hệ sinh thái học tập số Tin học 11

Website thực hành responsive bằng HTML5, CSS3 và JavaScript thuần, phù hợp triển khai GitHub Pages.

## 1. Cấu trúc

- `index.html`: trang tổng quan, lộ trình và bản đồ nhiệm vụ.
- `mission1_email.html`: soạn email mời giáo viên.
- `mission2_reply.html`: trả lời email, thực hành đính kèm tệp và ghi minh chứng.
- `mission3_share.html`: Google Docs, Viewer / Commenter / Editor.
- `mission4_social.html`: bài đăng “Thanh niên với văn hóa giao thông”.
- `mission5_ai.html`: an toàn số và AI Challenge.
- `submit.html`: thông tin học sinh, kiểm tra bài và gửi nộp.
- `teacher.html`: dashboard đọc dữ liệu từ Apps Script.
- `assets/style.css`, `assets/app.js`, `assets/config.js`: giao diện, logic, cấu hình.
- `Code.gs`: backend Google Apps Script để ghi Google Sheets.

## 2. Chạy thử tại máy

Mở `index.html` bằng trình duyệt. Bài làm tự lưu trong `localStorage` của trình duyệt hiện tại. Đây là bản lưu cục bộ, **không đồng bộ giữa các thiết bị** cho đến khi cấu hình backend.

## 3. Deploy GitHub Pages

1. Tạo repository mới trên GitHub, ví dụ `bai8-hoc-tap-so`.
2. Tải lên toàn bộ tệp và thư mục trong gói này; giữ nguyên cấu trúc.
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch**, nhánh `main`, thư mục `/(root)`, rồi Save.
5. Chờ GitHub hoàn tất triển khai. Địa chỉ thường có dạng `https://TEN-TAI-KHOAN.github.io/bai8-hoc-tap-so/`.
6. Mở thử `index.html`, kiểm tra trên điện thoại và máy tính.

> GitHub Pages là website tĩnh công khai. Không lưu mật khẩu, mã xác thực hoặc dữ liệu học sinh nhạy cảm trong mã nguồn.

## 4. Kết nối Google Sheets qua Apps Script

### Tạo bảng dữ liệu
1. Tạo một Google Spreadsheet mới.
2. Sao chép ID nằm giữa `/d/` và `/edit` trong URL.
3. Mở **Extensions → Apps Script**, dán nội dung `Code.gs`.
4. Trong **Project Settings → Script properties**, thêm:
   - Property: `SHEET_ID`
   - Value: ID Google Spreadsheet vừa tạo.
5. Chạy thử hàm `doGet` không trực tiếp từ editor; cấp quyền cho script khi được yêu cầu thông qua một hàm kiểm tra hoặc khi triển khai.
6. Chọn **Deploy → New deployment → Web app**.
7. Chọn tài khoản thực thi phù hợp. Phạm vi truy cập phải tuân theo chính sách tài khoản trường; không chọn công khai nếu không được phép.
8. Sao chép URL kết thúc bằng `/exec`.

### Cấu hình website
Mở `assets/config.js` và đặt:

```js
window.BAI8_CONFIG = {
  appsScriptUrl: "DAN_URL_WEB_APP_EXEC_VAO_DAY",
  googleFormUrl: "DAN_URL_GOOGLE_FORM_VAO_DAY",
  className: "Tin học 11",
  projectTitle: "Bài 8 - Thực hành nâng cao"
};
```

Sau đó commit thay đổi lên GitHub. Nút “Gửi bài đến giáo viên” gửi dữ liệu văn bản tới Apps Script. Do cách gửi `no-cors` từ website tĩnh, trình duyệt không thể xác nhận nội dung phản hồi; hãy kiểm tra Google Sheets để xác nhận bản ghi đã đến.

### Bảo mật và giới hạn
- Nếu dùng `doGet`, endpoint trả các bản ghi có thể đọc được cho người truy cập endpoint. Chỉ bật khi dữ liệu được phép công khai; không chứa dữ liệu nhạy cảm.
- Với lớp học thực tế, ưu tiên Google Forms có đăng nhập trường và phân quyền Google Sheets chỉ cho giáo viên. Có thể bỏ hàm `doGet` và chỉ dùng Form/Sheet nội bộ.
- Tích hợp hiện tại ghi bài nộp dạng văn bản và link; **không tải ảnh trực tiếp lên Drive**. Để nộp ảnh, thêm câu hỏi “Tải tệp lên” trong Google Forms (thường yêu cầu học sinh đăng nhập Google) hoặc dùng thư mục Drive đã phân quyền.
- Không đặt khóa bí mật, token hoặc mật khẩu trong `config.js`.
- Nên kiểm thử bằng dữ liệu giả trước khi dùng với học sinh.

## 5. Google Forms Integration

1. Tạo Google Form “Bài 8 – Nộp sản phẩm học tập”.
2. Thêm câu hỏi: Họ tên, lớp, nhóm, link Google Docs, bài đăng mạng xã hội, prompt AI, bản hoàn thiện, thay đổi sau khi dùng AI, giải thích xử lý link đáng ngờ.
3. Nếu cần minh chứng ảnh, thêm câu hỏi **File upload** và kiểm tra chính sách tài khoản trường.
4. Trong tab Responses, liên kết với Google Sheets.
5. Sao chép URL biểu mẫu và điền vào `googleFormUrl` trong `assets/config.js`.
6. Kiểm thử bằng tài khoản học sinh. Lưu ý Google Forms và Apps Script là hai kênh lưu riêng; nếu dùng cả hai, tránh yêu cầu học sinh nộp trùng mà không có mục đích.

## 6. Tạo QR Code

### Cách nhanh, không cần cài phần mềm
1. Đợi website GitHub Pages hoạt động và sao chép URL công khai.
2. Mở URL bằng Chrome trên máy tính.
3. Dùng chức năng chia sẻ trang / tạo mã QR của trình duyệt (tên mục có thể thay đổi theo phiên bản).
4. Tải ảnh QR hoặc chụp màn hình, chèn vào slide/phiếu học tập.
5. Dùng điện thoại quét thử ở khoảng cách thực tế trước khi in.

Có thể dùng một công cụ tạo QR đáng tin cậy khác, nhưng không nhập URL chứa dữ liệu cá nhân hoặc URL nội bộ. QR chỉ nên trỏ đến trang học tập công khai, không chứa điểm hay thông tin học sinh.

## 7. Gợi ý tổ chức 2 tiết

**Tiết 1 (45 phút)**
- 5 phút: tình huống mở đầu, tiêu chí giao tiếp số.
- 12 phút: nhiệm vụ 1 – soạn email.
- 10 phút: nhiệm vụ 2 – trả lời thư, đính kèm và kiểm tra minh chứng.
- 13 phút: nhiệm vụ 3 – Google Docs, quyền chia sẻ.
- 5 phút: phản hồi nhanh, kiểm tra quyền riêng tư.

**Tiết 2 (45 phút)**
- 12 phút: nhiệm vụ 4 – bài đăng văn minh.
- 8 phút: nhiệm vụ 5 – nhận diện link trúng thưởng.
- 18 phút: AI Challenge – hỏi, kiểm chứng, chỉnh sửa, nêu thay đổi.
- 7 phút: nộp bài, tự đánh giá, phản hồi.

## 8. Rubric gợi ý (10 điểm)

- Email và giao tiếp số: 2.0 điểm.
- Trả lời thư, đính kèm, minh chứng an toàn: 1.5 điểm.
- Chia sẻ tài liệu đúng quyền và giải thích: 1.5 điểm.
- Bài đăng văn minh, nội dung và bản quyền: 2.0 điểm.
- Xử lý link đáng ngờ có lý do: 1.0 điểm.
- AI Challenge: có prompt, kiểm chứng, bản chỉnh sửa, minh bạch: 2.0 điểm.

## 9. Năng lực số và AI

- NLS1: tìm/khai thác thông tin số phục vụ nhiệm vụ.
- NLS2: đánh giá độ tin cậy của thông tin và nội dung AI.
- NLS3: giao tiếp, chia sẻ, phối hợp trên nền tảng số.
- NLS4: sáng tạo nội dung số (email, tài liệu, bài đăng).
- NLS5: trách nhiệm số, bảo vệ dữ liệu, ứng xử văn minh và an toàn.

Đây là ánh xạ sư phạm gợi ý theo yêu cầu thiết kế; khi lập hồ sơ chính thức, giáo viên cần đối chiếu mã chỉ báo, mức độ và thuật ngữ nguyên văn trong văn bản TT02, TT18, QĐ 2422 đang áp dụng tại đơn vị.
