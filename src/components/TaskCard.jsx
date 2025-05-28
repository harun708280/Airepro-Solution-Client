import React from "react";
import { Card, Dropdown, Menu, Popconfirm, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  CalendarDays,
  CalendarCheck,
  Info,
  ListTodo,
  Pencil,
  Trash2,
} from "lucide-react";
import dayjs from "dayjs";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(task);
  };

  const formatDate = (date) => dayjs(date).format("MMM DD, YYYY");

  const statusColor = {
    todo: "blue",
    "in-progress": "orange",
    done: "green",
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={handleEdit} icon={<Pencil size={16} />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" danger icon={<Trash2 size={16} />}>
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => onDelete(task._id)}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <ListTodo size={18} /> {task.title}
        </div>
      }
      extra={
        <Dropdown overlay={menu} trigger={["click"]}>
          <EllipsisOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        </Dropdown>
      }
      className="mb-4 shadow-md"
    >
      {task.description && (
        <p className="flex items-center gap-2 text-gray-700 mb-2">
          <Info size={16} /> {task.description}
        </p>
      )}

      <div className="text-sm text-gray-500 space-y-1">
        <p className="flex items-center gap-2">
          <CalendarDays size={16} /> Start: {formatDate(task.startDate)}
        </p>
        <p className="flex items-center gap-2">
          <CalendarCheck size={16} /> End: {formatDate(task.endDate)}
        </p>
      </div>

      <div className="mt-2">
        <Tag color={statusColor[task.status] || "default"}>
          {task.status.toUpperCase()}
        </Tag>
      </div>
    </Card>
  );
};

export default TaskCard;
