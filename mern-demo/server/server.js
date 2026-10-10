const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

// BẮT BUỘC PHẢI CÓ 2 DÒNG NÀY ĐỂ ĐỌC BODY VÀ KHÔNG BỊ CHẶN CORS
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required');
}

// API Kiểm tra
app.get('/api/hello', (req, res) => {
    res.json({ message: "Backend MERN đang hoạt động thành công!" });
});

// GET /api/students - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/students - Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
    try {
        const { studentId, name, email } = req.body;
        const newStudent = await Student.create({ studentId, name, email });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/students/:id - Cập nhật thông tin sinh viên theo ID
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/students/:id - Xóa sinh viên theo ID
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Đã xóa sinh viên thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// THỨ TỰ CHUẨN: Đợi DB kết nối thành công rồi mới mở port Server
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('🔥 Kết nối thành công tới MongoDB Atlas!');
        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại port: ${PORT}`);
        });
    })
    .catch((error) => console.error('❌ Lỗi kết nối MongoDB:', error.message));