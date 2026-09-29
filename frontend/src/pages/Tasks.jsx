import { useEffect, useState } from "react";import axios from "axios";
function Tasks() {
  const [tasks, setTasks] = useState([]);
const [showForm, setShowForm] = useState(false);

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [dueDate, setDueDate] = useState("");
const [priority, setPriority] = useState("medium");
const totalTasks = tasks.length;

const pendingTasks = tasks.filter(
  (task) => task.status === "pending"
).length;

const completedTasks = tasks.filter(
  (task) => task.status === "completed"
).length;

const highPriorityTasks = tasks.filter(
  (task) => task.priority === "high"
).length;
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5001/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  fetchTasks();
}, []);
const handleCreateTask = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5001/api/tasks",
      {
        title,
        description,
        due_date: dueDate || null,
        priority,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks((prevTasks) => [response.data, ...prevTasks]);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");

    setShowForm(false);

  } catch (error) {
    console.error("Failed to create task:", error);

    alert(
      error.response?.data?.message ||
      "Failed to create task"
    );
  }
};
const handleUpdateTaskStatus = async (taskId, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `http://localhost:5001/api/tasks/${taskId}/status`,
      {
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? response.data : task
      )
    );

  } catch (error) {
    console.error("Failed to update task status:", error);

    alert(
      error.response?.data?.message ||
      "Failed to update task status"
    );
  }
};
const handleDeleteTask = async (taskId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5001/api/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );

  } catch (error) {
    console.error("Failed to delete task:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete task"
    );
  }
};
  return (
    <div className="page">

      {/* Page Header */}

      <div className="page-header">

        <div>
          <p className="page-label">TASK MANAGEMENT</p>

          <h1>Tasks</h1>

          <p>
            Organize your study work and stay on track.
          </p>
        </div>
<button
  className="primary-button"
  onClick={() => setShowForm(true)}
>
  + Add Task
</button>

      </div>

{showForm && (
  <div className="add-task-card">

    <div className="add-task-header">
      <div>
        <h2>Create New Task</h2>
        <p>Add a study task to your schedule.</p>
      </div>

      <button
        className="close-button"
        onClick={() => setShowForm(false)}
      >
        ✕
      </button>
    </div>

   <form
  className="task-form"
  onSubmit={handleCreateTask}
>

      <div className="form-group">
        <label>Task Title</label>
       <input
  type="text"
  placeholder="e.g. Practice Binary Trees"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
/>
      </div>

      <div className="form-group">
        <label>Description</label>
       <textarea
  placeholder="What do you need to complete?"
  rows="4"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
></textarea>
      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Due Date</label>
         <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>
        </div>

        <div className="form-group">
          <label>Priority</label>

         <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

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
          type="submit"
          className="primary-button"
        >
          Create Task
        </button>

      </div>

    </form>
  </div>
)}
      {/* Task Statistics */}

      <div className="task-stats">

        <div className="task-stat-card">
          <span>Total Tasks</span>
         <strong>{totalTasks}</strong>
        </div>

        <div className="task-stat-card">
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
        </div>

        <div className="task-stat-card">
          <span>Completed</span>
         <strong>{completedTasks}</strong>
        </div>

        <div className="task-stat-card">
          <span>High Priority</span>
         <strong>{highPriorityTasks}</strong>
        </div>

      </div>


      {/* Task List */}

      <div className="tasks-card">

        <div className="tasks-card-header">

          <div>
            <h2>Your Tasks</h2>

            <p>
              Keep track of everything you need to study.
            </p>
          </div>

        </div>


        {/* Empty State */}

        {tasks.length === 0 ? (
  <div className="tasks-empty">

    <div className="tasks-empty-icon">
      ✅
    </div>

    <h3>No tasks yet</h3>

    <p>
      Create your first task and start organizing your study schedule.
    </p>

    <button className="primary-button">
      + Create Your First Task
    </button>

  </div>
) : (
  <div className="task-list">

    {tasks.map((task) => (
<div
  className={`task-item ${
    task.status === "completed" ? "completed" : ""
  }`}
  key={task.id}
>
        <div>
          <h3>{task.title}</h3>

          {task.description && (
            <p>{task.description}</p>
          )}

          <span className="task-priority">
            {task.priority}
          </span>
        </div>

        <div className="task-actions">

  <span className="task-status">
    {task.status}
  </span>

  {task.status !== "completed" && (
    <button
      className="complete-button"
onClick={() =>
  handleUpdateTaskStatus(task.id, "completed")
}    >
      ✓ Complete
    </button>
  )}
{task.status === "completed" && (
  <button
    className="reopen-button"
    onClick={() =>
      handleUpdateTaskStatus(task.id, "pending")
    }
  >
    ↩ Reopen
  </button>
)}
<button
  className="delete-button"
  onClick={() => handleDeleteTask(task.id)}
>
  🗑 Delete
</button>
</div>

      </div>
    ))}

  </div>
)}

      </div>

    </div>
  );
}

export default Tasks;