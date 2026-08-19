import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  // Câu 47: Gọi API GET /api/students để lấy danh sách
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

  // Câu 49: Gửi dữ liệu POST /api/students
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Không thể thêm sinh viên')

      setStudentId('')
      setName('')
      setEmail('')
      await fetchStudents()
    } catch (err) {
      setError(err.message)
      console.error('Lỗi khi thêm sinh viên:', err)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Quản Lý Sinh Viên</h1>

      {/* Câu 48: Form nhập thông tin sinh viên */}
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
        <button type="submit">Thêm Sinh Viên</button>
      </form>
      {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}

      {/* Câu 47: Hiển thị danh sách sinh viên */}
      <h2>Danh Sách Sinh Viên</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <strong>{student.studentId}</strong> - {student.name} ({student.email})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App