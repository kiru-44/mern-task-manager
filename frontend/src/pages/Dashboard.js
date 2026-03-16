import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylepage/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Check token & Fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchTasks(token);
    }
  }, [navigate]);

  // ✅ Fetch Tasks
  const fetchTasks = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ✅ Create Task
  const createTask = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks(token);

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ✅ Toggle Complete
  const toggleComplete = async (task) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks(token);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ✅ Delete Task
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks(token);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
  <div className="dashboard">

    {/* Header */}
    <div className="dashboard-header">
      <h2>Task Manager</h2>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>

    {/* Create Task */}
    <h3>Create Task</h3>

    <form className="task-form" onSubmit={createTask}>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Task</button>

    </form>

    {/* Task List */}

    <h3>Your Tasks</h3>

    {tasks.length === 0 ? (
      <p>No tasks found</p>
    ) : (
      tasks.map((task) => (
        <div className="task-card" key={task._id}>

          <h4>{task.title}</h4>
          <p>{task.description}</p>

          <p>
            Status:{" "}
            <strong>
              {task.completed ? "Completed" : "Pending"}
            </strong>
          </p>

          <div className="task-actions">

            <button
              className="complete-btn"
              onClick={() => toggleComplete(task)}
            >
              {task.completed ? "Mark Pending" : "Mark Completed"}
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>

          </div>

        </div>
      ))
    )}

  </div>
);
}
export default Dashboard;
