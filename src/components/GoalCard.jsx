import React from "react";
import { Card, Tag, Button, Popconfirm, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  FlagOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const GoalCard = ({ goal, onEdit, onDelete }) => {
  return (
    <Card
      hoverable
      className="rounded-xl bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md border-gray-200 dark:border-gray-700"
      bodyStyle={{ padding: "20px" }}
    >
      {/* Header: Title + Actions */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FlagOutlined className="text-blue-500 mt-1" />
          <Title level={5} className="!m-0 text-lg text-gray-800 dark:text-white">
            {goal.title}
          </Title>
        </div>

        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            size="small"
            className="hover:text-blue-600 text-gray-600 dark:text-gray-300"
            type="text"
            onClick={() => onEdit(goal)}
          />

          <Popconfirm
            title="Are you sure you want to delete this goal?"
            onConfirm={() => onDelete(goal._id)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              className="hover:text-red-600 text-gray-600 dark:text-red-400"
              type="text"
            />
          </Popconfirm>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 space-y-3">
        <div>
          <Text className="text-sm text-gray-500 dark:text-gray-400">Type</Text>
          <Tag color="blue" className="ml-2 capitalize">
            {goal.type}
          </Tag>
        </div>

        <div>
          <Text className="text-sm text-gray-500 dark:text-gray-400">Status</Text>
          <Tag color="green" className="ml-2 capitalize" icon={<CheckCircleOutlined />}>
            {goal.progress}
          </Tag>
        </div>
      </div>
    </Card>
  );
};

export default GoalCard;
