import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../Spinner/Spinner";
import {
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiOutlineEye,
  HiOutlinePencil,
} from "react-icons/hi";
import { Link } from "react-router";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(
      `https://fin-ease-server-jet.vercel.app/transactions?email=${user.email}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.fixedTransactions)) {
          setTransactions(result.fixedTransactions);
        } else {
          setTransactions([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setTransactions([]);
      })
      .finally(() => setLoading(false));
  }, [user, sortBy, order]);

  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  // Prepare data for the line chart (cumulative balance over time)
  const prepareChartData = () => {
    if (transactions.length === 0) return null;

    const sortedTxns = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let runningBalance = 0;
    const dates = [];
    const balances = [];

    sortedTxns.forEach((txn) => {
      runningBalance += txn.type === "income" ? txn.amount : -txn.amount;
      dates.push(
        new Date(txn.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
      balances.push(runningBalance);
    });

    return {
      labels: dates,
      datasets: [
        {
          label: "Balance Over Time",
          data: balances,
          fill: true,
          backgroundColor: "rgba(45, 212, 191, 0.15)",
          borderColor: "#14b8a6",
          tension: 0.4,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#10b981",
          pointRadius: 5,
          pointHoverRadius: 8,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Balance: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#6b7280",
          callback: (value) => `$${value.toLocaleString()}`,
        },
        grid: { color: "rgba(156, 163, 175, 0.2)" },
      },
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false },
      },
    },
  };

  const chartData = prepareChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            My Transactions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {transactions.length > 0
              ? `Tracking ${transactions.length} transaction${
                  transactions.length > 1 ? "s" : ""
                }`
              : "Start adding your income and expenses"}
          </p>
        </div>

        {/* Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          <div className="flex items-center gap-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <HiOutlineCash className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-lg font-medium text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>

          <button
            onClick={toggleOrder}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            {order === "desc" ? (
              <HiOutlineSortDescending className="w-6 h-6" />
            ) : (
              <HiOutlineSortAscending className="w-6 h-6" />
            )}
            {order === "desc" ? "Newest First" : "Oldest First"}
          </button>
        </div>

        {/* Loading / Empty / Transactions + Graph */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-200/50 dark:bg-gray-700/50 rounded-full w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                <HiOutlineCash className="w-24 h-24 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                No Transactions Yet
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Start tracking your income and expenses to see them here.
              </p>
              <Link
                to="/add-transaction"
                className="inline-block px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Add Your First Transaction
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Transaction Cards with View & Update Buttons */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
              {transactions.map((txn, index) => (
                <div
                  key={txn._id}
                  className="group relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  <div className="flex justify-between items-start mb-6">
                    <span
                      className={`px-5 py-2 rounded-full font-bold text-lg shadow-md ${
                        txn.type === "income"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
                      }`}
                    >
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </span>
                    <span className="text-3xl font-black text-gray-800 dark:text-gray-100">
                      ${txn.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Category
                      </p>
                      <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {txn.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <HiOutlineCalendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        {new Date(txn.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {txn.description && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notes
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 italic">
                          {txn.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* View & Update Buttons */}
                  <div className="flex gap-4">
                    <Link
                      to={`/detail-transaction/${txn._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-teal-500/20 hover:bg-teal-500/30 dark:bg-teal-900/40 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold rounded-2xl border border-teal-500/50 dark:border-teal-700/50 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                      View
                    </Link>

                    <Link
                      to={`/update-transaction/${txn._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500/20 hover:bg-emerald-500/30 dark:bg-emerald-900/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold rounded-2xl border border-emerald-500/50 dark:border-emerald-700/50 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <HiOutlinePencil className="w-5 h-5" />
                      Update
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-600 text-center">
                      Transaction #{index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Balance Over Time Graph */}
            {chartData && (
              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-10">
                <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
                  Balance Over Time
                </h3>
                <div className="h-96">
                  <Line data={chartData} options={chartOptions} />
                </div>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-6 text-sm">
                  Your financial journey visualized — every transaction shapes
                  your future.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;
