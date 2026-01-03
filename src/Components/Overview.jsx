import React, { useContext, useEffect, useState } from "react"; // Fixed: useContext instead of use
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../Spinner/Spinner";

const Overview = () => {
  const { user } = useContext(AuthContext); // Correct way to get user from context
  const [overview, setOverview] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = user?.email;

  useEffect(() => {
    const fetchData = async () => {
      if (!userEmail) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch overview summary
        const overviewRes = await fetch(
          `http://localhost:3000/overview?email=${userEmail}`
        );
        const overviewData = await overviewRes.json();

        // Fetch recent transactions (latest 5, sorted by date desc)
        const transactionsRes = await fetch(
          `http://localhost:3000/transactions?email=${userEmail}&sortBy=date&order=desc`
        );
        const transactionsData = await transactionsRes.json();

        if (overviewData.success && transactionsData.success) {
          setOverview(overviewData.overview);
          setRecentTransactions(transactionsData.fixedTransactions.slice(0, 5));
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount || 0));
  };

  const savingsRate =
    overview && overview.totalIncome > 0
      ? ((overview.totalIncome - overview.totalExpense) /
          overview.totalIncome) *
        100
      : 0;

  // ✅ Now using your custom Spinner component
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
        <AlertCircle size={24} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's your financial summary.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Balance
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(overview?.balance || 0)}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Income
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                +{formatCurrency(overview?.totalIncome || 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ArrowUpRight className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Expenses
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                -{formatCurrency(overview?.totalExpense || 0)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <ArrowDownRight className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Savings Rate
              </p>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 mt-2">
                {savingsRate.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <TrendingUp className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Transactions
          </h2>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            No transactions yet. Start by adding one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Description
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn) => (
                  <tr
                    key={txn._id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                      {txn.description || txn.name || "No description"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="badge badge-sm badge-outline">
                        {txn.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(txn.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-medium text-right ${
                        txn.type?.toLowerCase() === "income"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {txn.type?.toLowerCase() === "income" ? "+" : "-"}
                      {formatCurrency(txn.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
