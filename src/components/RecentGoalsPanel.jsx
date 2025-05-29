import React, { useEffect, useState, useContext } from "react";
import { Typography, Button, message } from "antd";
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
        const res = await axios.get("https://airepro-solution-server.vercel.app/api/goals", {
          params: { userId: user?._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const sorted = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

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

  return (
    <div className="bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-md transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <Title level={4} className="!mb-0 text-gray-900 dark:text-white text-lg sm:text-xl">
          Recent Goals
        </Title>
        <Button type="link" onClick={() => navigate("/goals")} className="p-0">
          View All
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
      ) : goals.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">No recent goals found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 hidden sm:table-header-group">
              <tr>
                <th className="px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">Title</th>
                <th className="px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">Type</th>
                <th className="px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">Progress</th>
                <th className="px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody>
              {goals.map(({ _id, title, type, progress, createdAt }) => {
                let progressColor = "text-gray-600";
                if (progress === "Completed") progressColor = "text-green-600";
                else if (progress === "In Progress") progressColor = "text-orange-600";

                return (
                  <tr
                    key={_id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors sm:table-row flex flex-col sm:flex-row sm:items-center px-4 py-2 sm:px-0 sm:py-0"
                  >
                    <td className="px-0 sm:px-4 py-2 text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      <span className="block sm:hidden text-sm text-gray-500">Title:</span>
                      {title}
                    </td>
                    <td className="px-0 sm:px-4 py-2 text-gray-900 dark:text-gray-100">
                      <span className="block sm:hidden text-sm text-gray-500">Type:</span>
                      {type}
                    </td>
                    <td className={`px-0 sm:px-4 py-2 font-semibold ${progressColor}`}>
                      <span className="block sm:hidden text-sm text-gray-500">Progress:</span>
                      {progress}
                    </td>
                    <td className="px-0 sm:px-4 py-2 text-gray-700 dark:text-gray-300">
                      <span className="block sm:hidden text-sm text-gray-500">Created At:</span>
                      {new Date(createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentGoalsTable;
