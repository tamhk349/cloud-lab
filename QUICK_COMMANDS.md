# QUICK COMMANDS - COPY & PASTE NGAY

## BƯỚC 1: Chuẩn Bị Ban Đầu
```powershell
git pull
git status
docker --version
docker compose version
docker login
```

## BƯỚC 2: Build và Run Local
```powershell
docker compose build
docker compose up -d
docker compose ps
docker ps
```

## BƯỚC 3: Push lên Docker Hub
```powershell
docker tag mern-backend tamhk349/mern-backend:1.0
docker tag mern-frontend tamhk349/mern-frontend:1.0
docker push tamhk349/mern-backend:1.0
docker push tamhk349/mern-frontend:1.0
```

## BƯỚC 4: Xóa Image Local và Pull từ Hub
```powershell
docker compose down
docker rmi tamhk349/mern-backend:1.0
docker rmi tamhk349/mern-frontend:1.0
docker pull tamhk349/mern-backend:1.0
docker pull tamhk349/mern-frontend:1.0
```

## BƯỚC 5: Run từ Docker Hub
```powershell
docker compose -f docker-compose.hub.yml up -d
docker compose -f docker-compose.hub.yml ps
```

## BƯỚC 6: Test & Verify
```powershell
# Mở browser: http://localhost:3000
# Test chức năng CRUD
docker compose -f docker-compose.hub.yml logs -f backend
docker ps
```

## BƯỚC 7: Update Version 2.0
```powershell
# Chỉnh sửa Frontend
docker build -t mern-frontend:2.0 ./mern-demo/client
docker tag mern-frontend:2.0 tamhk349/mern-frontend:2.0
docker push tamhk349/mern-frontend:2.0
# Chỉnh sửa docker-compose.hub.yml tag từ 1.0 thành 2.0
docker compose -f docker-compose.hub.yml up -d
```

## BƯỚC 8: Commit & Push Code
```powershell
git add .
git commit -m "Complete Lab 04 Docker Hub Multi-Container"
git push
```

## Lệnh Hữu Ích Khác
```powershell
# Xem log chi tiết
docker compose logs -f

# Xem log riêng backend
docker compose logs backend

# Kiểm tra network
docker network ls
docker network inspect cloud-lab_default

# Dừng toàn bộ
docker compose down

# Xóa mọi thứ (careful!)
docker system prune -a
```
