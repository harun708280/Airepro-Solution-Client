import React, { useEffect, useState } from "react";
import { Typography, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RecentTasksPanel = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://airepro-solution-server.vercel.app/api/tasks",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

  return (
    <div className="bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-md transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <Title
          level={4}
          className="!mb-0 text-gray-900 dark:text-white text-lg sm:text-xl"
        >
          Recent Tasks
        </Title>
        <Button type="link" onClick={() => navigate("/tasks")} className="p-0">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 hidden sm:table-header-group">
            <tr>
              <th className="px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                Title
              </th>
              <th className="px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map(({ _id, title, status, createdAt }) => {
                let statusColor = "text-blue-600";
                if (status === "done") statusColor = "text-green-600";
                else if (status === "in-progress" || status === "inprogress")
                  statusColor = "text-orange-600";

                return (
                  <tr
                    key={_id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors sm:table-row flex flex-col sm:flex-row sm:items-center px-4 py-2 sm:px-0 sm:py-0"
                  >
                    <td className="px-0 sm:px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">
                      <span className="block sm:hidden text-sm text-gray-500">
                        Title:
                      </span>
                      {title}
                    </td>
                    <td
                      className={`px-0 sm:px-4 py-2 font-semibold ${statusColor}`}
                    >
                      <span className="block sm:hidden text-sm text-gray-500">
                        Status:
                      </span>
                      {status.toUpperCase()}
                    </td>
                    <td className="px-0 sm:px-4 py-2 text-gray-700 dark:text-gray-300">
                      <span className="block sm:hidden text-sm text-gray-500">
                        Created At:
                      </span>
                      {new Date(createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No recent tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTasksPanel;
