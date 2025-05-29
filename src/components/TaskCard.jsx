import React, { useState } from "react";
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
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, onEdit, onDelete, fetchTasks }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const statusColor = {
    todo: "blue",
    "in-progress": "orange",
    done: "green",
  };

  const formatDate = (date) => dayjs(date).format("MMM DD, YYYY");

  const menu = (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<Pencil size={16} />}
        onClick={() => setEditModalOpen(true)}
      >
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
    <>
      <Card
        title={
          <div className="flex items-center gap-2 flex-wrap">
            <ListTodo size={18} />{" "}
            <span className="text-base font-medium">{task.title}</span>
          </div>
        }
        extra={
          <Dropdown overlay={menu} trigger={["click"]}>
            <EllipsisOutlined style={{ fontSize: 20, cursor: "pointer" }} />
          </Dropdown>
        }
        className="mb-4 shadow-md w-full"
        bodyStyle={{ padding: "12px" }}
      >
        {task.description && (
          <p className="flex items-center gap-2 text-gray-700 mb-2 text-sm">
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
