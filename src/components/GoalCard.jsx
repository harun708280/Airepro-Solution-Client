import React from 'react';
import { Card, Tag, Space, Button, Popconfirm, message } from 'antd';

const GoalCard = ({ goal, onEdit, onDelete }) => {
  return (
    <Card
      title={goal.title}
      extra={
        <Space>
          <Button type="link" onClick={() => onEdit(goal)}>Edit</Button>

          <Popconfirm
            title="Are you sure you want to delete this goal?"
            onConfirm={() => onDelete(goal._id)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button danger type="link">Delete</Button>
          </Popconfirm>
        </Space>
      }
    >
      <p>Type: <Tag color="blue">{goal.type}</Tag></p>
      <p className="my-3">Status <Tag color="green">{goal.progress}</Tag></p>
    </Card>
  );
};

export default GoalCard;
