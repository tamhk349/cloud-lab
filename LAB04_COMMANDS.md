# LAB 04 - DOCKER COMPOSE & MERN MULTI-CONTAINER
## Danh Sách Các Lệnh Để Copy-Paste

---

## PHẦN 1: TIẾP TỤC SOURCE CODE BUỔI 3 (20 phút)

### Câu 1: Kiểm tra source code trên GitHub
```
git remote -v
```

### Câu 2: Cập nhật source code mới nhất từ GitHub
```
git pull
```

### Câu 3: Kiểm tra trạng thái source code
```
git status
```

### Câu 4: Kiểm tra cấu trúc thư mục (Windows)
```
tree /F /L 2
```
**Hoặc kiểm tra thủ công bằng Explorer**

### Câu 5: Kiểm tra phiên bản Docker
```
docker --version
```

### Câu 6: Kiểm tra phiên bản Docker Compose
```
docker compose version
```

---

## PHẦN 2: DOCKER COMPOSE VÀ MERN MULTI-CONTAINER (50 phút)

### Câu 9: Kiểm tra nội dung docker-compose.yml
```
type docker-compose.yml
```

### Câu 14: Xây dựng lại Docker Image cho toàn bộ ứng dụng
```
docker compose build
```

### Câu 15: Khởi động toàn bộ các Service ở chế độ Background
```
docker compose up -d
```

### Câu 16: Kiểm tra trạng thái các Service
```
docker compose ps
```

### Câu 17: Liệt kê các Container
```
docker ps
```

### Câu 18: Kiểm tra Docker Network
```
docker network ls
```

### Câu 19: Kiểm tra thông tin Container trong Docker Network
```
docker network inspect cloud-lab_default
```

### Câu 20: Xem log của toàn bộ hệ thống MERN
```
docker compose logs
```

### Câu 21: Xem log riêng của Backend Service
```
docker compose logs backend
```

### Câu 22-25: Truy cập Frontend và test chức năng
**Mở trình duyệt và truy cập:** `http://localhost:3000`

### Câu 26: Dừng toàn bộ hệ thống MERN
```
docker compose down
```

### Câu 27: Khởi động lại hệ thống
```
docker compose up -d
```

---

## PHẦN 3: ĐÓNG GÓI DOCKER IMAGE VÀO DOCKER HUB (50 phút)

### Câu 30: Đăng nhập Docker Hub từ Terminal
```
docker login
```
**Nhập username và password khi được yêu cầu**

### Câu 31: Liệt kê các Docker Image
```
docker images
```

### Câu 33: Đổi tên Docker Image Backend theo cú pháp Docker Hub
```
docker tag mern-backend tamhk349/mern-backend:1.0
```

### Câu 34: Đổi tên Docker Image Frontend theo cú pháp Docker Hub
```
docker tag mern-frontend tamhk349/mern-frontend:1.0
```

### Câu 35: Kiểm tra các Tag của Docker Image
```
docker images
```

### Câu 36: Push Docker Image Backend lên Docker Hub
```
docker push tamhk349/mern-backend:1.0
```

### Câu 37: Push Docker Image Frontend lên Docker Hub
```
docker push tamhk349/mern-frontend:1.0
```

### Câu 38-40: Kiểm tra trên Docker Hub
**Truy cập https://hub.docker.com và kiểm tra các Repository**

---

## PHẦN 4: PULL IMAGE TỪ DOCKER HUB (35 phút)

### Câu 41: Xóa Docker Image Backend trên máy local
```
docker rmi tamhk349/mern-backend:1.0
```

### Câu 42: Xóa Docker Image Frontend trên máy local
```
docker rmi tamhk349/mern-frontend:1.0
```

### Câu 43: Kiểm tra danh sách Docker Image sau khi xóa
```
docker images
```

### Câu 44: Tải Docker Image Backend từ Docker Hub
```
docker pull tamhk349/mern-backend:1.0
```

### Câu 45: Tải Docker Image Frontend từ Docker Hub
```
docker pull tamhk349/mern-frontend:1.0
```

### Câu 46: Kiểm tra các Docker Image vừa tải
```
docker images
```

### Câu 47: Chạy Backend Container từ Docker Image
```
docker run -d -p 5000:5000 -e MONGODB_URI="mongodb+srv://tamhk349_db_user:bCPtkSQQt96BgAEi@cluster0.ep6p6zs.mongodb.net/cloud_lab?retryWrites=true&w=majority" --name backend-test tamhk349/mern-backend:1.0
```

### Câu 48: Kiểm tra Backend API
```
curl http://localhost:5000/api/students
```

### Câu 49: Dừng và xóa Backend Container
```
docker stop backend-test
```

```
docker rm backend-test
```

---

## PHẦN 5: TRIỂN KHAI MERN MULTI-CONTAINER TỪ DOCKER HUB (45 phút)

### Câu 50: Tạo file docker-compose.hub.yml
**Tạo file mới tại thư mục gốc: `docker-compose.hub.yml`**

Nội dung:
```yaml
version: '3.8'

services:
  backend:
    image: tamhk349/mern-backend:1.0
    container_name: mern-backend-hub
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb+srv://tamhk349_db_user:bCPtkSQQt96BgAEi@cluster0.ep6p6zs.mongodb.net/cloud_lab?retryWrites=true&w=majority

  frontend:
    image: tamhk349/mern-frontend:1.0
    container_name: mern-frontend-hub
    ports:
      - "3000:80"
    depends_on:
      - backend
```

### Câu 56: Khởi động hệ thống MERN bằng Docker Compose từ Docker Hub
```
docker compose -f docker-compose.hub.yml up -d
```

### Câu 57: Kiểm tra các Service đang chạy
```
docker compose -f docker-compose.hub.yml ps
```

### Câu 58: Kiểm tra các Docker Image được sử dụng
```
docker ps
```

### Câu 59-62: Truy cập Frontend và test chức năng
**Mở trình duyệt:** `http://localhost:3000`

### Câu 63: Dừng toàn bộ hệ thống MERN
```
docker compose -f docker-compose.hub.yml down
```

### Câu 64: Khởi động lại hệ thống
```
docker compose -f docker-compose.hub.yml up -d
```

---

## PHẦN 6: TRIỂN KHAI MERN TRÊN GITHUB CODESPACES (40 phút)

### Câu 65: Tạo Codespace trên GitHub
**Truy cập GitHub → Code → Codespaces → Create codespace on main**

### Câu 67: Kiểm tra phiên bản Docker trong Codespaces
```
docker --version
```

### Câu 68: Kiểm tra phiên bản Docker Compose trong Codespaces
```
docker compose version
```

### Câu 69: Đăng nhập Docker Hub từ Codespaces
```
docker login
```

### Câu 70: Tải Docker Image Backend
```
docker pull tamhk349/mern-backend:1.0
```

### Câu 71: Tải Docker Image Frontend
```
docker pull tamhk349/mern-frontend:1.0
```

### Câu 72: Kiểm tra Docker Image
```
docker images
```

### Câu 73-74: Khởi động hệ thống MERN trong Codespaces
```
docker compose -f docker-compose.hub.yml up -d
```

### Câu 75: Kiểm tra Container đang chạy
```
docker compose -f docker-compose.hub.yml ps
```

### Câu 76-77: Forward Port và truy cập
**Mở PORTS panel trong Codespaces và truy cập Forwarded Address**

---

## PHẦN 7: CẬP NHẬT IMAGE VÀ QUẢN LÝ VERSION (20 phút)

### Câu 81: Build lại Docker Image Frontend phiên bản 2.0
```
docker build -t mern-frontend:2.0 ./mern-demo/client
```

### Câu 82: Gắn Tag Docker Hub cho Frontend phiên bản 2.0
```
docker tag mern-frontend:2.0 tamhk349/mern-frontend:2.0
```

### Câu 83: Push Frontend Image phiên bản 2.0 lên Docker Hub
```
docker push tamhk349/mern-frontend:2.0
```

### Câu 84: Kiểm tra các Version trên Docker Hub
**Truy cập Docker Hub → mern-frontend → Tags**

### Câu 85-86: Cập nhật docker-compose.hub.yml để sử dụng version 2.0
**Sửa tag từ `1.0` thành `2.0` trong file docker-compose.hub.yml**

```
docker compose -f docker-compose.hub.yml up -d
```

---

## PHẦN 8: GIT VÀ BÀI TẬP TỔNG HỢP

### Câu 87: Kiểm tra các file đã thay đổi
```
git status
```

### Câu 90: Đưa các file vào Staging Area
```
git add .
```

### Câu 91: Tạo Commit
```
git commit -m "Complete Lab 04 Docker Hub Multi-Container"
```

### Câu 92: Push source code lên GitHub
```
git push
```

---

## BÀI TẬP TỔNG HỢP (Câu 93-99)

### Câu 93: Xóa Container và Image
```
docker compose down
```

```
docker rmi tamhk349/mern-backend:1.0
```

```
docker rmi tamhk349/mern-frontend:1.0
```

### Câu 94: Tải lại Image từ Docker Hub
```
docker pull tamhk349/mern-backend:1.0
```

```
docker pull tamhk349/mern-frontend:1.0
```

### Câu 95: Khởi động hệ thống
```
docker compose -f docker-compose.hub.yml up -d
```

### Câu 96: Kiểm tra trạng thái
```
docker compose -f docker-compose.hub.yml ps
```

### Câu 97: Test chức năng CRUD
**Truy cập Frontend và thử thêm, sửa, xóa sinh viên**

### Câu 98: Kiểm tra Image và Version đang sử dụng
```
docker ps
```

### Câu 99: Kiểm tra Docker Hub
**Truy cập Docker Hub để xác nhận các Image**

---

## LƯU Ý QUAN TRỌNG

1. **Username Docker Hub:** `tamhk349`

2. **MongoDB URI** đã có sẵn trong docker-compose.yml

3. **Sau mỗi lệnh**, hãy chụp màn hình để lưu kết quả

4. **Lệnh xem log**:
   ```
   docker compose logs -f backend
   ```
   (Nhấn `Ctrl+C` để dừng xem log)

5. **Nếu cần xóa mọi thứ và bắt đầu lại**:
   ```
   docker compose down -v
   docker system prune -a
   ```
