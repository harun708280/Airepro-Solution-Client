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
      const res = await axios.get(`http://localhost:5000/api/goals`, {
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
      await axios.delete(`http://localhost:5000/api/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      message.success('Goal deleted');
      fetchGoals(); // Refresh list
    } catch (error) {
      console.error('Delete error:', error.message);
      message.error('Failed to delete goal');
    }
  };

  const handleSubmit = async (updatedGoal) => {
    if (updatedGoal._id) {
      // update goal
      try {
        await axios.put(`http://localhost:5000/api/goals/${updatedGoal._id}`, updatedGoal, {
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
    // If it's a new goal, it’s already handled inside GoalFormModal via axios
    setModalVisible(false);
    fetchGoals(); // Refresh after add/edit
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Title level={2}>Airepro Solution Goals</Title>
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          Add Goal
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <Col xs={24} sm={12} md={8} key={goal._id}>
              <GoalCard goal={goal} onEdit={handleEdit} onDelete={handleDelete} fetchGoals={fetchGoals} />
            </Col>
          ))
        ) : (
          <Empty description="No goals found." style={{ margin: 'auto' }} />
        )}
      </Row>

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
