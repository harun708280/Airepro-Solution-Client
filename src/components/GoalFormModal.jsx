import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

const { Option } = Select;

const GoalFormModal = ({ visible, onCancel, onSubmit, initialData, fetchGoals }) => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (!initialData) {
        await axios.post(
          'https://airepro-solution-server.vercel.app/api/goals',
          {
            ...values,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        toast.success(' Goal added successfully!');
        fetchGoals();
      } else {
        onSubmit({ ...initialData, ...values });
        toast.success(' Goal updated successfully!');
      }

      form.resetFields();
      onCancel();
    } catch (error) {
      console.error(error);
      toast.error(' Something went wrong while saving the goal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      title={initialData ? 'Edit Goal' : 'Add New Goal'}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText={initialData ? 'Update' : 'Add'}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Goal Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select placeholder="Select type">
            <Option value="Weekly">Weekly</Option>
            <Option value="Monthly">Monthly</Option>
          </Select>
        </Form.Item>
        <Form.Item name="progress" label="Status" rules={[{ required: true }]}>
          <Select placeholder="Select status">
            <Option value="Not Started">Not Started</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GoalFormModal;
