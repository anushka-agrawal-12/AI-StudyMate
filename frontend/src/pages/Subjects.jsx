import { useEffect, useState } from "react";
import axios from "axios";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5001/api/subjects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSubjects(response.data);

      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjects();
  }, []);
const handleCreateSubject = async () => {
  if (!subjectName.trim()) {
    alert("Please enter a subject name");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5001/api/subjects",
      {
        name: subjectName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSubjects((prevSubjects) => [
      response.data,
      ...prevSubjects,
    ]);

    setSubjectName("");
    setShowForm(false);

  } catch (error) {
    console.error("Failed to create subject:", error);

    alert(
      error.response?.data?.message ||
      "Failed to create subject"
    );
  }
};
const handleDeleteSubject = async (subjectId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this subject?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5001/api/subjects/${subjectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSubjects((prevSubjects) =>
      prevSubjects.filter(
        (subject) => subject.id !== subjectId
      )
    );

  } catch (error) {
    console.error("Failed to delete subject:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete subject"
    );
  }
};
  return (
    <div className="page">

      <div className="page-header">
  <div>
    <p className="page-label">ACADEMICS</p>
    <h1>Subjects</h1>
    <p>Manage and organize your subjects.</p>
  </div>

  <button
    className="primary-button"
    onClick={() => setShowForm(true)}
  >
    + Add Subject
  </button>
</div>
{showForm && (
  <div className="add-task-card">

    <div className="add-task-header">
      <div>
        <h2>Add Subject</h2>
        <p>Create a subject for your study plan.</p>
      </div>

      <button
        className="close-button"
        onClick={() => setShowForm(false)}
      >
        ✕
      </button>
    </div>

    <div className="task-form">

      <div className="form-group">
        <label>Subject Name</label>

        <input
          type="text"
          placeholder="e.g. Computer Networks"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
      </div>

      <div className="task-form-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>

        <button
  type="button"
  className="primary-button"
  onClick={handleCreateSubject}
>
  Add Subject
</button>

      </div>

    </div>
  </div>
)}

      <div className="tasks-card">

        <div className="tasks-card-header">
          <h2>Your Subjects</h2>
          <p>Subjects you've added to your study plan.</p>
        </div>

        {subjects.length === 0 ? (
          <p>No subjects found.</p>
        ) : (
          <div>
{subjects.map((subject) => (
  <div key={subject.id}>
    <h3>{subject.name}</h3>

    <button
      className="delete-button"
      onClick={() => handleDeleteSubject(subject.id)}
    >
      🗑 Delete
    </button>
  </div>
))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Subjects;