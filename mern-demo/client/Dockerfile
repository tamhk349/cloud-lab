# Câu 51: Base Image Node.js cho quá trình build (Cập nhật Node 20+ để tương thích với Vite mới)
FROM node:20-alpine AS build

# Câu 52: Thư mục làm việc bên trong Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json
COPY package*.json ./

# Câu 54: Cài đặt các package
RUN npm install

# Câu 55: Sao chép source code React vào Container
COPY . .

# Câu 56: Build React Application (tạo thư mục dist)
RUN npm run build

# Sử dụng Nginx nhẹ để chạy file tĩnh sản phẩm (Production)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]