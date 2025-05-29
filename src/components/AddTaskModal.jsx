import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Checkbox, message, Button } from "antd";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const { TextArea } = Input;

const AddTaskModal = ({ open, onClose,fetchTasks }) => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const formattedData = {
        ...values,
        userId: user?._id,
        startDate: values.startDate ? values.startDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
      };

      console.log("🚀 Submitted Task Data:", formattedData);

      // Axios API call
      const response = await axios.post(
        "https://airepro-solution-server.vercel.app/api/tasks",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks()

      form.resetFields();
      onClose();
    } catch (error) {
      if (error.response) {
        message.error(`❌ Error: ${error.response.data.message || "Failed to save task."}`);
      } else if (error.name === "Error") {
        message.error("Please fill all required fields correctly.");
      } else {
        message.error("Something went wrong.");
      }
      console.error("🛑 API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setLoading(false);
    }
  }, [open]);

  return (
    <Modal
      title="Add New Task"
      open={open}
      onCancel={() => {
        form.resetFields();
        setLoading(false);
        onClose();
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            form.resetFields();
            setLoading(false);
            onClose();
          }}
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          {loading ? "Saving..." : "Save Task"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ max: 500, message: "Maximum 500 characters allowed." }]}
        >
          <TextArea rows={3} placeholder="Enter task description (optional)" />
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
          initialValue="todo"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select>
            <Select.Option value="todo">To Do</Select.Option>
            <Select.Option value="inprogress">In Progress</Select.Option>
            <Select.Option value="done">Done</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="completed"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Mark as Completed</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
