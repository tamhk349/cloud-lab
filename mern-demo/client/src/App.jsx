import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  
  // State phục vụ việc Sửa (PUT)
  const [editingId, setEditingId] = useState(null)

  // Câu 59 & 63: Gọi API GET /api/students để lấy danh sách
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students')
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Không thể tải danh sách sinh viên')
      setStudents(data)
    } catch (err) {
      setError(err.message)
      console.error('Lỗi khi tải danh sách:', err)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // Chọn sinh viên để sửa
  const handleEdit = (student) => {
    setEditingId(student._id)
    setStudentId(student.studentId)
    setName(student.name)
    setEmail(student.email)
    setError('')
  }

  // Hủy trạng thái sửa
  const handleCancelEdit = () => {
    setEditingId(null)
    setStudentId('')
    setName('')
    setEmail('')
    setError('')
  }

  // Câu 60 & 61: Xử lý Thêm mới (POST) hoặc Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editingId) {
        // Câu 61: Gọi API PUT /api/students/:id
        const res = await fetch(`/api/students/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, name, email })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Không thể cập nhật sinh viên')

        setEditingId(null)
      } else {
        // Câu 60: Gọi API POST /api/students
        const res = await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, name, email })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Không thể thêm sinh viên')
      }

      setStudentId('')
      setName('')
      setEmail('')
      await fetchStudents() // Câu 63: Tải lại danh sách sau khi thao tác
    } catch (err) {
      setError(err.message)
      console.error('Lỗi khi lưu dữ liệu:', err)
    }
  }

  // Câu 62: Gọi API DELETE /api/students/:id để xóa sinh viên
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      setError('')
      try {
        const res = await fetch(`/api/students/${id}`, {
          method: 'DELETE'
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Không thể xóa sinh viên')

        await fetchStudents() // Câu 63: Tải lại danh sách sau khi xóa
      } catch (err) {
        setError(err.message)
        console.error('Lỗi khi xóa sinh viên:', err)
      }
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Quản Lý Sinh Viên</h1>

      {/* Form nhập/chỉnh sửa thông tin sinh viên */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Mã Sinh Viên (MSSV)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Họ và Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit" style={{ marginRight: '10px' }}>
          {editingId ? 'Cập Nhật Sinh Viên' : 'Thêm Sinh Viên'}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Hủy
          </button>
        )}
      </form>

      {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}

      {/* Hiển thị danh sách sinh viên kèm nút Sửa và Xóa */}
      <h2>Danh Sách Sinh Viên</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id} style={{ marginBottom: '10px' }}>
            <span style={{ marginRight: '15px' }}>
              <strong>{student.studentId}</strong> - {student.name} ({student.email})
            </span>
            <button onClick={() => handleEdit(student)} style={{ marginRight: '5px' }}>
              Sửa
            </button>
            <button onClick={() => handleDelete(student._id)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App