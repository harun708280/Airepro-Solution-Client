import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Checkbox, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "sonner";

const { TextArea } = Input;

const EditTaskModal = ({ open, onClose, task, fetchTasks }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (task && open) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        startDate: dayjs(task.startDate),
        endDate: dayjs(task.endDate),
        status: task.status,
        completed: task.completed || false,
      });
    }
  }, [task, open]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const updatedTask = {
        ...values,
        startDate: values.startDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
      };

      await axios.put(
        `https://airepro-solution-server.vercel.app/api/tasks/${task._id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(" Task updated successfully!");
      fetchTasks();
      onClose();
      form.resetFields();
    } catch (error) {
      toast.error(" Failed to update task.");
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Task"
      open={open}
      onCancel={() => {
        onClose();
        form.resetFields();
        setLoading(false);
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" loading={loading} onClick={handleUpdate}>
          {loading ? "Updating..." : "Update Task"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ max: 500 }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: "Start date is required" }]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: "End date is required" }]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select>
            <Select.Option value="todo">To Do</Select.Option>
            <Select.Option value="inprogress">In Progress</Select.Option>
            <Select.Option value="done">Done</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="completed" valuePropName="checked">
          <Checkbox>Mark as Completed</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
