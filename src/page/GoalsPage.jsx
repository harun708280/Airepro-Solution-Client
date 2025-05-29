import React from 'react';
import { Layout, Typography } from 'antd';
import GoalList from '@/components/GoalList';


const { Content } = Layout;
const { Title } = Typography;

const GoalsPage = () => {
  return (
    <Layout style={{ minHeight: '100vh', padding: '2rem' }}>
      <Content>
        
        <GoalList />
      </Content>
    </Layout>
  );
};

export default GoalsPage;
