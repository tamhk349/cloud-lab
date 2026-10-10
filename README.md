# Cloud Computing Laboratory
Student Name: Nguyễn Thanh Tâm
Student ID: 235733
Class: DH23Tin06

<<<<<<< Updated upstream
## Updated for Lab 4( hiện tại là đủ 6 lab mà update edit là 4 có gì thầy check sẽ đủ toàn bộ nha thầy
=======
## Triển khai ứng dụng MERN trên Render

Dự án này có thể triển khai trên Render mà không cần tạo tài nguyên AWS hay
EC2. Frontend chạy dưới dạng Render Static Site, còn backend là Render Web
Service được build từ Dockerfile. MongoDB Atlas tiếp tục được dùng làm cơ sở dữ liệu.

### 1. Chuẩn bị MongoDB Atlas

Tạo người dùng cơ sở dữ liệu và sao chép chuỗi kết nối MongoDB của ứng dụng.
Trong mục **Network Access** của Atlas, cho phép kết nối từ Render. Khi thực
hành, có thể cần cho phép `0.0.0.0/0` vì IP đi ra của Render có thể thay đổi;
với môi trường production, hãy giới hạn chính sách mạng phù hợp. Không commit
chuỗi kết nối vào Git.

### 2. Triển khai backend

Trong Render Dashboard, tạo **New Web Service**, kết nối với repository này
và cấu hình:

- **Root Directory (thư mục gốc):** `mern-demo/server`
- **Runtime (môi trường chạy):** Docker
- **Dockerfile Path (đường dẫn Dockerfile):** `./Dockerfile`
- **Health Check Path (đường dẫn kiểm tra):** `/api/hello`

Trong phần biến môi trường của service, thêm `MONGODB_URI` với chuỗi kết nối
Atlas. Render tự cung cấp biến `PORT` và server sẽ sử dụng biến này. Triển khai
service rồi sao chép URL công khai, ví dụ `https://your-backend.onrender.com`.

### 3. Triển khai frontend

Tạo **New Static Site** từ cùng repository và cấu hình:

- **Root Directory (thư mục gốc):** `mern-demo/client`
- **Build Command (lệnh build):** `npm install && npm run build`
- **Publish Directory (thư mục xuất bản):** `dist`

Thêm biến môi trường `VITE_API_URL` với URL gốc công khai của backend, ví dụ
`https://your-backend.onrender.com` (không thêm dấu `/` ở cuối hoặc `/api`).
Triển khai Static Site. Frontend sẽ dùng URL này để gửi các request `/api/...`.
Nếu không đặt biến này, môi trường phát triển local và cấu hình Docker Compose
hiện tại vẫn tiếp tục dùng đường dẫn `/api` trên cùng origin.

### 4. Kiểm tra

- Mở `https://your-backend.onrender.com/api/hello` và xác nhận API trả về
  phản hồi kiểm tra trạng thái.
- Mở URL Render Static Site, kiểm tra chức năng xem danh sách, thêm, cập nhật
  và xóa sinh viên.
- Nếu request thất bại, xem log backend và kiểm tra kết nối MongoDB Atlas.

Sau khi thay đổi `VITE_API_URL`, cần triển khai lại Static Site vì Vite nhúng
giá trị này vào ứng dụng tại thời điểm build. Không đưa file `.env`, thông tin
đăng nhập cơ sở dữ liệu, AWS key hoặc private key lên Git.
>>>>>>> Stashed changes
