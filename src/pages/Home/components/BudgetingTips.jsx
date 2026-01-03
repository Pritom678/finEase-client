import React from "react";
import { HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartPie, HiOutlineScissors } from "react-icons/hi2";

const BudgetingTips = () => {
  const budgetingTips = [
    {
      icon: <HiOutlineBanknotes className="w-10 h-10" />,
      title: "Save 20% Every Month",
      desc: "Automatically set aside a portion of your income into savings — prioritize your future self like any essential bill.",
    },
    {
      icon: <HiOutlineChartPie className="w-10 h-10" />,
      title: "Follow the 50/30/20 Rule",
      desc: "Allocate 50% to needs, 30% to wants, and 20% to savings/debt. A proven framework for balanced financial health.",
    },
    {
      icon: <HiOutlineCalendarDays className="w-10 h-10" />,
      title: "Track & Review Weekly",
      desc: "Regularly monitor your spending patterns to identify leaks and maintain full control over your finances.",
    },
    {
      icon: <HiOutlineScissors className="w-10 h-10" />,
      title: "Eliminate Unused Subscriptions",
      desc: "Audit recurring charges monthly — small unused services add up to significant annual savings.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Smart Budgeting Strategies
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto text-lg">
          Proven principles to help you manage money wisely and build long-term
          financial security.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {budgetingTips.map((tip, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:bg-teal-200 dark:group-hover:bg-teal-800/70 transition-colors duration-300">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetingTips;
