import React from "react";
import { Layout, Typography } from "antd";
import GoalList from "@/components/GoalList";

const GoalsPage = () => {
  return (
    <div className="p-6">
      <GoalList />
    </div>
  );
};

export default GoalsPage;
