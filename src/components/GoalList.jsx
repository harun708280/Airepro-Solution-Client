import React, { useState, useEffect, useContext } from 'react';
import { Button, Row, Col, Empty, message } from 'antd';
import GoalCard from './GoalCard';
import GoalFormModal from './GoalFormModal';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`https://airepro-solution-server.vercel.app/api/goals`, {
        params: { userId: user?._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGoals(res.data);
    } catch (error) {
      console.error('Error fetching goals:', error.message);
      message.error('Failed to fetch goals');
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchGoals();
    }
  }, [user]);

  const handleAdd = () => {
    setSelectedGoal(null);
    setModalVisible(true);
  };

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://airepro-solution-server.vercel.app/api/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      message.success('Goal deleted');
      fetchGoals();
    } catch (error) {
      console.error('Delete error:', error.message);
      message.error('Failed to delete goal');
    }
  };

  const handleSubmit = async (updatedGoal) => {
    if (updatedGoal._id) {
      try {
        await axios.put(`https://airepro-solution-server.vercel.app/api/goals/${updatedGoal._id}`, updatedGoal, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        message.success('Goal updated');
      } catch (error) {
        console.error(error.message);
        message.error('Update failed');
      }
    }
    setModalVisible(false);
    fetchGoals();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <Title level={2} className="!m-0 text-gray-800 dark:text-white"> Airepro Solution Goals</Title>
        <Button type="primary" onClick={handleAdd} className="rounded-md">
          + Add Goal
        </Button>
      </div>

      {/* Cards */}
      {goals.length > 0 ? (
        <Row gutter={[16, 16]}>
          {goals.map((goal) => (
            <Col xs={24} sm={12} md={8} key={goal._id}>
              <GoalCard goal={goal} onEdit={handleEdit} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          <Empty
  description={
    <span className="text-gray-500 dark:text-gray-100">
      No goals found.
    </span>
  }
/>

        </div>
      )}

      {/* Modal */}
      <GoalFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialData={selectedGoal}
        fetchGoals={fetchGoals}
      />
    </div>
  );
};

export default GoalList;
