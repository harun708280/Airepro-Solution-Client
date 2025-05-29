import React from 'react';
import { Layout, Typography } from 'antd';
import GoalList from '@/components/GoalList';


const { Content } = Layout;
const { Title } = Typography;

const GoalsPage = () => {
  return (
    <div className="p-6">
         <GoalList />

    </div>
        
       
     
  );
};

export default GoalsPage;
