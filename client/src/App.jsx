import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

 
  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  
  const handleEdit = (id) => {
    const student = students.find((s) => s._id === id);

    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEditingId(id);
  };

  
  const handleSubmit = () => {
    if (editingId) {
      axios
        .put(`http://localhost:5000/students/${editingId}`, {
          name,
          course,
          age,
        })
        .then(() => {
          fetchStudents();

          setEditingId(null);
          setName("");
          setCourse("");
          setAge("");
        });
    } else {
      axios
        .post("http://localhost:5000/students", {
          name,
          course,
          age,
        })
        .then(() => {
          fetchStudents();

          setName("");
          setCourse("");
          setAge("");
        });
    }
  };

 
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        fetchStudents();
      });
  };

  return (
    <>
      <h1>Student Management System</h1>

      <h2>
        {editingId ? "Edit Student" : "Add Student"}
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        {editingId ? "Update Student" : "Add Student"}
      </button>

      <hr />

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button
            onClick={() => handleEdit(student._id)}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(student._id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </>
  );
}

export default App;