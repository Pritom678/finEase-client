import React, { useContext, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../context/AuthContext";

const COLORS = [
  "#4f46e5",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://fin-ease-server-jet.vercel.app/report?email=${user.email}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setSummary(result.summary);
            setChartData(result.categoryData);
          }
        })
        .catch((err) => console.error("Error fetching report:", err));
    }
  }, [user?.email]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          📈 Financial Summary
        </h2>
        <p className="text-gray-600 mb-12">
          Here's an overview of your income, expenses, and category breakdown.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-100 p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-green-700">
              Total Income
            </h3>
            <p className="text-3xl font-bold mt-2 text-green-800">
              ₹{summary.totalIncome?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-red-100 p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-red-700">
              Total Expense
            </h3>
            <p className="text-3xl font-bold mt-2 text-red-800">
              ₹{summary.totalExpense?.toLocaleString() || 0}
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl shadow-md ${
              summary.netBalance >= 0 ? "bg-blue-100" : "bg-yellow-100"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-700">Net Balance</h3>
            <p
              className={`text-3xl font-bold mt-2 ${
                summary.netBalance >= 0 ? "text-blue-800" : "text-yellow-800"
              }`}
            >
              ₹{summary.netBalance?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            🥧 Spending by Category
          </h3>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  dataKey="amount"
                  nameKey="category"
                  label={({ category, percent }) =>
                    `${category} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No expense data available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reports;
