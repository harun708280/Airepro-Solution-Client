import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RecentTasksPanel from "@/components/RecentTasksPanel";
import RecentGoalsTable from "@/components/RecentGoalsPanel";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.get(
          "https://airepro-solution-server.vercel.app/api/quote"
        );
        console.log("QUOTE RESPONSE:", res.data);

        if (Array.isArray(res.data) && res.data.length > 0) {
          const { q, a } = res.data[0];
          setQuote(`${q} — ${a}`);
        } else if (res.data.quote) {
          setQuote(res.data.quote);
        } else {
          setQuote("Stay motivated and achieve your goals!");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Couldn't load quote. Stay strong!");
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen  transition-colors duration-300">
      {/* Header */}
      <header className="backdrop-blur-md shadow-md rounded-b-xl px-4 md:px-6 py-5 sticky top-0 z-10 bg-white/70 dark:bg-gray-800/60 transition-colors duration-300">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Welcome,{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            {user?.name}
          </span>
        </h1>
        <p className="mt-2 italic text-gray-600 dark:text-gray-300 max-w-xl">{`"${quote}"`}</p>
      </header>

      {/* Main content */}
      <main className="px-4 md:px-6 mt-6 space-y-6">
        <RecentTasksPanel />
        <RecentGoalsTable />
      </main>
    </div>
  );
};

export default DashboardPage;
