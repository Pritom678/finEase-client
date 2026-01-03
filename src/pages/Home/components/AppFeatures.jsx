import React from "react";
import { HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartPie, HiOutlineScissors } from "react-icons/hi2";

const AppFeatures = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-[#0f172a]/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Powerful Features for Smarter Finance
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto text-lg">
          Everything you need to track, budget, and grow your money — all in one
          secure place.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <HiOutlineBanknotes className="w-12 h-12" />,
              title: "Automatic Sync",
              desc: "Securely connect your banks and cards for real-time transaction updates.",
            },
            {
              icon: <HiOutlineChartPie className="w-12 h-12" />,
              title: "Smart Budgeting",
              desc: "Create custom budgets and get alerts before you overspend.",
            },
            {
              icon: <HiOutlineScissors className="w-12 h-12" />,
              title: "Expense Insights",
              desc: "See where your money goes with clear reports and trends.",
            },
            {
              icon: <HiOutlineCalendarDays className="w-12 h-12" />,
              title: "Goal Tracking",
              desc: "Set savings goals and watch your progress grow month by month.",
            },
            {
              icon: <HiOutlineChartPie className="w-12 h-12" />,
              title: "Detailed Reports",
              desc: "Monthly and yearly summaries to plan ahead confidently.",
            },
            {
              icon: <HiOutlineBanknotes className="w-12 h-12" />,
              title: "Secure & Private",
              desc: "Bank-level encryption — we never sell your data.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-teal-100 dark:bg-teal-900/50 rounded-2xl text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
