import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Typography, message } from "antd";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      message.error("Failed to load tasks.");
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const updatedTask = { ...task, status };
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (error) {
      message.error("Status update failed.");
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const taskId = draggableId;
    const newStatus = destination.droppableId;
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
    todo: "bg-blue-100 border-blue-400",
    "in-progress": "bg-yellow-100 border-yellow-400",
    done: "bg-green-100 border-green-400",
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Drag & Drop Task Board</Title>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row gutter={16}>
          {Object.entries(groupedTasks).map(([status, taskList]) => (
            <Col span={8} key={status}>
              <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
                <Title level={4} className="capitalize mb-4">
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
                                onDelete={(id) =>
                                  setTasks((prev) =>
                                    prev.filter((item) => item._id !== id)
                                  )
                                }
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
      />
    </div>
  );
};

export default TasksPage;
