import React, { useState } from "react";
import { Card, Dropdown, Popconfirm, Tag } from "antd";
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
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, onEdit, onDelete, fetchTasks }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const statusColor = {
    todo: "blue",
    "in-progress": "orange",
    done: "green",
  };

  const formatDate = (date) => dayjs(date).format("MMM DD, YYYY");

  const menu = {
    items: [
      {
        key: "edit",
        icon: <Pencil size={16} />,
        label: "Edit",
        onClick: () => setEditModalOpen(true),
      },
      {
        key: "delete",
        icon: <Trash2 size={16} />,
        label: (
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => onDelete(task._id)}
            okText="Yes"
            cancelText="No"
          >
            <span className="text-red-500 cursor-pointer">Delete</span>
          </Popconfirm>
        ),
        danger: true,
      },
    ],
  };

  return (
    <>
      <Card
  title={
    <div className="flex items-center gap-2 flex-wrap">
      <ListTodo size={18} className="text-gray-900 dark:text-white" />
      <span className="text-base font-medium text-gray-900 dark:text-white">{task.title}</span>
    </div>
  }
  extra={
    <Dropdown 
      menu={menu} 
      trigger={["click"]} 
      placement="bottomRight" 
      overlayClassName="dark:backdrop-blur-md dark:bg-black/70 rounded-lg shadow-lg"
    >
      <EllipsisOutlined 
        style={{ fontSize: 20, cursor: "pointer", color: "inherit" }} 
        className="text-gray-900 dark:text-white" 
      />
    </Dropdown>
  }
  className="mb-4 w-full rounded-lg border border-gray-300 dark:border-gray-700
             bg-white  dark:bg-black/40 dark:backdrop-blur-md shadow-lg"
  bodyStyle={{ padding: "12px" }}
>
  {task.description && (
    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2 text-sm">
      <Info size={16} className="text-gray-700 dark:text-gray-300" /> {task.description}
    </p>
  )}

  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
    <p className="flex items-center gap-2">
      <CalendarDays size={16} className="text-gray-500 dark:text-gray-400" /> Start: {formatDate(task.startDate)}
    </p>
    <p className="flex items-center gap-2">
      <CalendarCheck size={16} className="text-gray-500 dark:text-gray-400" /> End: {formatDate(task.endDate)}
    </p>
  </div>

  <div className="mt-2">
    <Tag color={statusColor[task.status] || "default"}>
      {task.status.toUpperCase()}
    </Tag>
  </div>
</Card>


      <EditTaskModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={task}
        onSave={onEdit}
        fetchTasks={fetchTasks}
      />
    </>
  );
};

export default TaskCard;
