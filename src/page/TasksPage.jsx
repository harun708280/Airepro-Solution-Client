import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Typography, message } from "antd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddTaskModal from "@/components/AddTaskModal";
import TaskCard from "@/components/TaskCard";

const { Title } = Typography;

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://airepro-solution-server.vercel.app/api/tasks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data);
    } catch (error) {
      message.error("Failed to load tasks.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://airepro-solution-server.vercel.app/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
      message.success("Task deleted");
    } catch (error) {
      console.error("Delete failed:", error.message);
      message.error("Failed to delete task");
    }
  };

  const updateTaskStatus = async (id, status) => {
    const prevTask = tasks.find((t) => t._id === id);
    try {
      const updatedTask = { ...prevTask, status };
      const res = await axios.put(
        `https://airepro-solution-server.vercel.app/api/tasks/${id}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      message.error("Status update failed. Reverting...");
      setTasks((prev) => prev.map((t) => (t._id === id ? prevTask : t)));
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const taskId = draggableId;
    const newStatus = destination.droppableId;

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    updateTaskStatus(taskId, newStatus);
  };

  const groupedTasks = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter(
      (t) => t.status === "inprogress" || t.status === "in-progress"
    ),
    done: tasks.filter((t) => t.status === "done"),
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  const statusColors = {
    todo: "bg-blue-100 dark:bg-blue-900 border-blue-400",
    "in-progress": "bg-yellow-100 dark:bg-yellow-900 border-yellow-400",
    done: "bg-green-100 dark:bg-green-900 border-green-400",
  };

  return (
    <div className="p-6 min-h-screen transition-all duration-300">
      <div className="flex justify-between items-center flex-wrap mb-6">
        <Title level={3} className="!text-gray-900 dark:!text-white">
          Drag & Drop Task Board
        </Title>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row gutter={[16, 16]}>
          {Object.entries(groupedTasks).map(([status, taskList]) => (
            <Col key={status} xs={24} sm={24} md={12} lg={8}>
              <div
                className={`p-4 transition-all duration-300 rounded-lg border ${statusColors[status]}`}
              >
                <Title
                  level={4}
                  className="capitalize mb-4 !text-gray-800 dark:!text-white"
                >
                  {statusLabels[status]} ({taskList.length})
                </Title>

                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4 min-h-[100px]"
                    >
                      {taskList.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onEdit={(t) =>
                                  setTasks((prev) =>
                                    prev.map((item) =>
                                      item._id === t._id ? t : item
                                    )
                                  )
                                }
                                onDelete={handleDelete}
                                fetchTasks={fetchTasks}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </Col>
          ))}
        </Row>
      </DragDropContext>

      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(task) => {
          setTasks((prev) => [...prev, task]);
          setModalOpen(false);
        }}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default TasksPage;
