import React, { useEffect, useState, useContext } from "react";
import { Table, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const { Title } = Typography;

const RecentGoalsTable = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentGoals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/goals", {
          params: { userId: user?._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const sorted = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6); // latest 6 goals

        setGoals(sorted);
      } catch (error) {
        console.error("Error fetching goals:", error.message);
        message.error("Failed to fetch recent goals");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchRecentGoals();
    }
  }, [user]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (text) => (
        <span
          style={{
            color: text === "Completed" ? "green" : text === "In Progress" ? "orange" : "gray",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="!mb-0"> Recent Goals</Title>
        <Button type="link" onClick={() => navigate("/goals")}>
          View All
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={goals}
        rowKey="_id"
        loading={loading}
        pagination={false}
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

export default RecentGoalsTable;
