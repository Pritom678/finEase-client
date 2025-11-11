import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/overview?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setOverview(data.overview);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Take Control of Your Finances Today 💰
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-blue-100"
        >
          Track your income, manage expenses, and achieve your goals smarter.
        </motion.p>
      </section>
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Your Financial Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-100 border-l-4 border-green-500 p-6 rounded-2xl shadow"
          >
            <h3 className="text-lg font-medium text-green-700">Total Income</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">
              ${overview.totalIncome.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-red-100 border-l-4 border-red-500 p-6 rounded-2xl shadow"
          >
            <h3 className="text-lg font-medium text-red-700">Total Expense</h3>
            <p className="text-3xl font-bold mt-2 text-red-600">
              ${overview.totalExpense.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-2xl shadow"
          >
            <h3 className="text-lg font-medium text-blue-700">
              Current Balance
            </h3>
            <p className="text-3xl font-bold mt-2 text-blue-600">
              ${overview.balance.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </section>
      {/* 📘 Budgeting Tips Section */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            💰 Smart Budgeting Tips
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Master your money — small consistent steps today lead to financial
            freedom tomorrow.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                icon: "💸",
                title: "Save 20% Every Month",
                desc: "Automatically transfer part of your income into savings — treat it like a bill to your future self.",
              },
              {
                icon: "📊",
                title: "Use the 50/30/20 Rule",
                desc: "50% needs, 30% wants, 20% savings. This simple rule keeps your finances balanced and stress-free.",
              },
              {
                icon: "🧾",
                title: "Track & Review Weekly",
                desc: "Monitor your spending regularly to catch bad habits early and stay accountable.",
              },
              {
                icon: "🚫",
                title: "Cut Unnecessary Subscriptions",
                desc: "Audit your subscriptions every month — you’ll be surprised how much you save!",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300 flex items-start space-x-4"
              >
                <div className="text-4xl">{tip.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💡 Why Financial Planning Matters */}
      <section className="bg-gradient-to-r from-base-200 to-secondary py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">
            Why Financial Planning Matters
          </h2>
          <p className="text-gray-700 mb-4">
            Financial planning empowers you to achieve long-term goals — whether
            it’s buying a home, saving for education, or building wealth.
          </p>
          <p className="text-gray-600">
            With a solid plan, you can make smarter decisions, reduce financial
            stress, and secure your future.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
