import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Typography, message } from "antd";
import AddTaskModal from "@/components/AddTaskModal";
import TaskCard from "@/components/TaskCard";

const { Title } = Typography;

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      message.error("Failed to load tasks.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Save new task
  const handleSaveTask = async (newTask) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => [...prev, res.data]);
      setModalOpen(false);
      message.success("Task added successfully!");
    } catch (error) {
      message.error("Failed to add task.");
      console.error(error);
    }
  };

  // Edit task
  const handleEditTask = async (taskToEdit) => {
    const newTitle = prompt("Edit title", taskToEdit.title);
    if (newTitle) {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/tasks/${taskToEdit._id}`,
          { ...taskToEdit, title: newTitle },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks(tasks.map(t => (t._id === taskToEdit._id ? res.data : t)));
        message.success("Task updated!");
      } catch (error) {
        message.error("Failed to update task.");
        console.error(error);
      }
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    console.log(id);
    
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(t => t._id !== id));
      message.success("Task deleted!");
    } catch (error) {
      message.error("Failed to delete task.");
      console.error(error);
    }
  };

 
  const groupedTasks = {
    todo: tasks.filter(t => t.status === "todo"),
    "in-progress": tasks.filter(t => t.status === "inprogress" || t.status === "in-progress"),
    done: tasks.filter(t => t.status === "done"),
  };

  const statusColors = {
    todo: "bg-blue-100 border-blue-400",
    "in-progress": "bg-yellow-100 border-yellow-400",
    done: "bg-green-100 border-green-400",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={3}> Airepro Solution Task </Title>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Task
        </Button>
      </div>

      <Row gutter={16}>
        {Object.entries(groupedTasks).map(([status, list]) => (
          <Col span={8} key={status}>
            <div
              className={`p-4 mb-4 rounded-lg border ${statusColors[status] || "bg-gray-50 border-gray-300"}`}
            >
              <Title level={4} className="capitalize mb-4">
                {statusLabels[status] || status} ({list.length})
              </Title>
              {list.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </Col>
        ))}
      </Row>

      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default TasksPage;
