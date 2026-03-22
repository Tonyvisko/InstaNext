# InstaNext

InstaNext là một ứng dụng mạng xã hội xây dựng bằng MERN (MongoDB, Express, React, Node.js), kèm theo hệ thống đề xuất (recommendation system), socket chat thời gian thực, và các tính năng tương tác như đăng bài, like/comment, follow, thông báo.

## Kiến trúc dự án

- `client/` - frontend React + TypeScript (Vite) cung cấp UI, routing, component, context và socket client.
- `server/` - backend Node.js + Express; API cùng cấu hình middleware auth + upload + socket.
- `recommendSystem/` - module Python để xây dựng mô hình đề xuất người dùng bằng dữ liệu socialmedia.csv.
- `uploads/` - lưu file ảnh/đăng tải.

## Tính năng chính

- Đăng ký, đăng nhập, xác thực JWT
- Thêm sửa xoá bài viết, upload ảnh Cloudinary
- Like, comment, follow/unfollow
- Tìm kiếm người dùng & bài đăng
- Graph tương tác (neo4j/redis, nếu được trang bị)
- Thông báo real-time với `notificationSocket`
- Chat 1-1 real-time với `chatSocket`
- Hệ thống đề xuất gợi ý bạn bè/bài viết (`recommendSystem`)

## Cài đặt và chạy

### 1. Backend

```bash
cd server
npm install
```

Phục hồi biến môi trường `.env` (nếu có):
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_URL`/CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET
- `REDIS_URL`/REDIS_HOST
- Neo4j (nếu dùng): `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`

Chạy server:

```bash
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Mở trình duyệt truy cập địa chỉ `http://localhost:5173` (hoặc port do Vite cung cấp).

### 3. Recommendation system (tùy chọn)

```bash
cd recommendSystem
pip install -r requirements.txt
python recommendSystem.py
```

## Cấu trúc thư mục server

- `app.js`: entry point Express
- `config/`: kết nối Cloudinary, Mongoose, Neo4j, Redis
- `middleware/`: xác thực JWT, upload file
- `models/`: schema Mongoose cho User/Post/Comment/Like/Notification/Message/Conversation
- `routes/`: API endpoints (user, post, message, explore, profile, search, tracking)
- `socket/`: khởi tạo socket.io cho chat + thông báo

## Cấu trúc thư mục client

- `src/components/`: UI, layout, trang con
- `src/context/`: quản lý Post/Notification/Socket state
- `src/hooks/useSocket.ts`: hook kết nối socket
- `src/fomat/`: type định nghĩa TS, format API
- `src/pages/`: HomePage/MessagePage/login/signup

## Mở rộng

- Thêm unit test (Jest, React Testing Library, Supertest)
- Triển khai Docker, CI/CD
- Thêm phân quyền RBAC và rate limit
- Tích hợp nhiều nhóm tag, feed gợi ý thông minh hơn

## Ghi chú

- Hiện trạng tùy môi trường: may cần điều chỉnh `CORS`, proxy API
- Cần dùng MongoDB và server Node chạy song song khi phát triển

---

**Hẹn bạn thành công với InstaNext!**
