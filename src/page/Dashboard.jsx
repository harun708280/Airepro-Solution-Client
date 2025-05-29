import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RecentTasksPanel from '@/components/RecentTasksPanel';
import RecentGoalsTable from '@/components/RecentGoalsPanel';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [quote, setQuote] = useState('');

  useEffect(() => {
  const fetchQuote = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/quote');
      if (res.data && res.data.length > 0) {
        const { q, a } = res.data[0]; // 🟢 শুধু q = quote, a = author
        setQuote(`${q} — ${a}`);
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuote("Stay motivated and focused! — Unknown");
    }
  };

  fetchQuote();
}, []);


  console.log(quote);
  

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md rounded-b-xl px-6 py-5 sticky top-0 z-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome, <span className="text-indigo-600">{user?.name}</span>!
        </h1>
        <p className="mt-2 italic text-gray-600 max-w-xl">{`"${quote}"`}</p>
      </header>

      
      <main className="p-6 space-y-6">
        {/* Today's Tasks */}
        <RecentTasksPanel />

        {/* Goals Summary */}
        <RecentGoalsTable/>
      </main>
    </div>
  );
};

export default DashboardPage;
