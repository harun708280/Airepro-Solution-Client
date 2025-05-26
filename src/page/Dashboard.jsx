import React from 'react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen  text-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
        <h1 className="text-2xl font-bold">Welcome, Harun!</h1>
        <button className='!bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700'>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        
        {/* Motivational Quote */}
        <section className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">✨ Motivational Quote</h2>
          <p className="italic text-lg">"Success is not final, failure is not fatal: It is the courage to continue that counts." — Winston Churchill</p>
        </section>

        {/* Today's Tasks */}
        <section className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">✅ Today's Tasks</h2>
            <button className="text-sm underline">View All</button>
          </div>
          <ul className="space-y-2">
            <li className="bg-white bg-opacity-20 p-3 rounded-lg">✔ Finish project report</li>
            <li className="bg-white bg-opacity-20 p-3 rounded-lg">❗ Prepare for meeting</li>
            <li className="bg-white bg-opacity-20 p-3 rounded-lg">📚 Read 10 pages of a book</li>
          </ul>
        </section>

        {/* Goals Summary */}
        <section className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">🎯 Your Goals</h2>
            <button className="text-sm underline">View All</button>
          </div>
          <ul className="space-y-2">
            <li className="bg-white bg-opacity-20 p-3 rounded-lg">🚀 Launch mini-project by Friday</li>
            <li className="bg-white bg-opacity-20 p-3 rounded-lg">🏋️ Exercise 3 times this week</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
