import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { HiOutlineBanknotes, HiOutlineScissors } from "react-icons/hi2";

const FinancialOverview = () => {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://fin-ease-server-jet.vercel.app/overview?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setOverview(data.overview);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
        Your Financial Overview
      </h2>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left: Glassmorphic Income/Expense Details + Circular Flow Ring */}
        <div className="lg:col-span-6 space-y-8">
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-10 shadow-2xl">
            {/* Circular Flow Visualization */}
            <div className="relative w-64 h-64 mx-auto mb-10">
              <svg className="w-full h-full -rotate-90">
                {/* Background ring */}
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                {/* Income portion (teal to emerald gradient) */}
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  stroke="url(#incomeGradient)"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 100}`}
                  strokeDashoffset={`${
                    2 *
                    Math.PI *
                    100 *
                    (1 -
                      overview.totalIncome /
                        (overview.totalIncome + overview.totalExpense || 1))
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-1500 ease-out drop-shadow-lg"
                />
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#14b8a6" /> {/* teal-500 */}
                    <stop offset="100%" stopColor="#10b981" />{" "}
                    {/* emerald-500 */}
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-5xl font-extrabold text-teal-600 dark:text-teal-400">
                  {overview.totalIncome + overview.totalExpense > 0
                    ? `${Math.round(
                        (overview.totalIncome /
                          (overview.totalIncome + overview.totalExpense)) *
                          100
                      )}%`
                    : "0%"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Income Ratio
                </p>
              </div>
            </div>

            {/* Income & Expense Breakdown */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Total Income
                  </p>
                  <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    ${overview.totalIncome.toLocaleString()}
                  </p>
                </div>
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center">
                  <HiOutlineBanknotes className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Total Expense
                  </p>
                  <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
                    ${overview.totalExpense.toLocaleString()}
                  </p>
                </div>
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/50 rounded-2xl flex items-center justify-center">
                  <HiOutlineScissors className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Hero Balance with Glassmorphism & Insights */}
        <div className="lg:col-span-6">
          <div className="relative bg-gradient-to-br from-teal-600/90 via-teal-500/90 to-emerald-600/90 dark:from-teal-800/90 dark:via-teal-700/90 dark:to-emerald-800/90 backdrop-blur-xl rounded-3xl p-8 text-white shadow-2xl border border-white/10 overflow-hidden">
            {/* Floating glow orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-teal-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <p className="text-teal-100 text-lg font-medium mb-3">
              Current Balance
            </p>
            <p className="text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-2xl">
              ${overview.balance.toLocaleString()}
            </p>

            {/* Savings Rate & Insight */}
            {overview.totalIncome > 0 && (
              <div className="mt-8 flex items-center gap-5">
                <div
                  className={`text-4xl font-bold ${
                    overview.balance >= 0 ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {overview.balance >= 0 ? "+" : ""}
                  {Math.round((overview.balance / overview.totalIncome) * 100)}%
                </div>
                <div>
                  <p className="text-teal-100 text-md">Savings Rate</p>
                  <p className="text-teal-50 text-xs mt-1 max-w-xs">
                    {overview.balance >= 0
                      ? "Excellent progress! You're consistently building wealth."
                      : "Time to optimize — small tweaks can boost this quickly."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialOverview;
