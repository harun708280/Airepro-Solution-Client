import React, { useEffect, useState } from "react";
import { Table, Typography, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for routing

const { Title } = Typography;

const RecentTasksPanel = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sorted = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setTasks(sorted);
      } catch (err) {
        message.error("Failed to load recent tasks.");
      }
    };

    fetchTasks();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "done") color = "green";
        else if (status === "in-progress" || status === "inprogress") color = "orange";
        return <span style={{ color }}>{status.toUpperCase()}</span>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="!mb-0"> Recent Tasks</Title>
        <Button type="link" onClick={() => navigate("/tasks")}>
          View All
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="_id"
        pagination={false}
        size="middle"
        bordered
      />
    </div>
  );
};

export default RecentTasksPanel;
