import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  HiCurrencyDollar,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
} from "react-icons/hi2";
import Spinner from "../../Spinner/Spinner";
import { Link } from "react-router";

const GRADIENT_COLORS = [
  { start: "#10b981", end: "#34d399" }, // emerald
  { start: "#14b8a6", end: "#5eead4" }, // teal
  { start: "#3b82f6", end: "#60a5fa" }, // blue
  { start: "#8b5cf6", end: "#a78bfa" }, // violet
  { start: "#f59e0b", end: "#fbbf24" }, // amber
  { start: "#ef4444", end: "#f87171" }, // red
];

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`https://fin-ease-server-jet.vercel.app/report?email=${user.email}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setSummary(result.summary || {});
            setChartData(result.categoryData || []);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching report:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const formatCurrency = (value) => `$${Number(value || 0).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            Financial Reports
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Gain deep insights into your income, spending patterns, and
            financial health
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {/* Total Income */}
              <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-1 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Total Income
                    </p>
                    <p className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(summary.totalIncome)}
                    </p>
                  </div>
                  <div className="p-5 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl group-hover:scale-110 transition-transform">
                    <HiArrowTrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Total Expense */}
              <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-1 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Total Expense
                    </p>
                    <p className="text-5xl font-extrabold text-rose-600 dark:text-rose-400">
                      {formatCurrency(summary.totalExpense)}
                    </p>
                  </div>
                  <div className="p-5 bg-rose-100 dark:bg-rose-900/50 rounded-2xl group-hover:scale-110 transition-transform">
                    <HiArrowTrendingDown className="w-12 h-12 text-rose-600 dark:text-rose-400" />
                  </div>
                </div>
              </div>

              {/* Net Balance */}
              <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-1 transition-all">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    summary.netBalance >= 0
                      ? "from-teal-500/10"
                      : "from-yellow-500/10"
                  } to-transparent pointer-events-none`}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Net Balance
                    </p>
                    <p
                      className={`text-5xl font-extrabold mt-4 ${
                        summary.netBalance >= 0
                          ? "text-teal-600 dark:text-teal-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {summary.netBalance >= 0 ? "+" : ""}
                      {formatCurrency(summary.netBalance)}
                    </p>
                  </div>
                  <div
                    className={`p-5 rounded-2xl group-hover:scale-110 transition-transform ${
                      summary.netBalance >= 0
                        ? "bg-teal-100 dark:bg-teal-900/50"
                        : "bg-yellow-100 dark:bg-yellow-900/50"
                    }`}
                  >
                    <HiCurrencyDollar
                      className={`w-12 h-12 ${
                        summary.netBalance >= 0
                          ? "text-teal-600 dark:text-teal-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Spending by Category - Enhanced Pie Chart */}
            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12">
              <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
                Spending Breakdown by Category
              </h3>

              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={500}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={180}
                      paddingAngle={3}
                      dataKey="amount"
                      nameKey="category"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            GRADIENT_COLORS[index % GRADIENT_COLORS.length]
                              .start
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), "Amount"]}
                      contentStyle={{
                        backgroundColor: "rgba(31, 41, 55, 0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        padding: "16px",
                      }}
                      labelStyle={{ color: "#fff", fontWeight: "bold" }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={80}
                      iconType="circle"
                      iconSize={16}
                      formatter={(value) => (
                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-24">
                  <div className="bg-gray-200/50 dark:bg-gray-700/50 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                    <HiCurrencyDollar className="w-20 h-20 text-gray-400 dark:text-gray-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    No Spending Data Yet
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Add some transactions to see your spending breakdown
                  </p>
                  <Link
                    to="/dashboard/add-transaction"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <HiCurrencyDollar className="w-5 h-5" />
                    Add Transaction
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
