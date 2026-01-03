import React from "react";
import { AuthContext } from "../../context/AuthContext";
import HeroSlider from "./components/HeroSlider";
import FinancialOverview from "./components/FinancialOverview";
import BudgetingTips from "./components/BudgetingTips";
import AppFeatures from "./components/AppFeatures";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import { HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartPie } from "react-icons/hi2";

const Home = () => {
  return (
    <div>
      <HeroSlider /> {/* No props needed anymore */}
      <FinancialOverview />
      <BudgetingTips />
      <AppFeatures />
      <Testimonials />
      <section className="py-28 px-6 bg-gradient-to-b from-gray-50 to-transparent dark:from-transparent dark:to-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
              Why Financial Planning Matters
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Taking control of your money isn't just about numbers — it's about
              building the life you want with confidence and freedom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Benefit 1: Reduce Stress */}
            <div className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <div className="flex flex-col items-center text-center">
                <div className="mb-8 p-6 bg-teal-100 dark:bg-teal-900/50 rounded-3xl text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                  <HiOutlineChartPie className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Reduce Financial Stress
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Know exactly where your money goes each month. Clear
                  visibility eliminates worry and helps you sleep better at
                  night.
                </p>
              </div>
            </div>

            {/* Benefit 2: Achieve Goals */}
            <div className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <div className="flex flex-col items-center text-center">
                <div className="mb-8 p-6 bg-teal-100 dark:bg-teal-900/50 rounded-3xl text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                  <HiOutlineBanknotes className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Achieve Your Dreams Faster
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  From buying a home to traveling the world or retiring early —
                  a solid plan turns big goals into reality, step by step.
                </p>
              </div>
            </div>

            {/* Benefit 3: Build Lasting Wealth */}
            <div className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <div className="flex flex-col items-center text-center">
                <div className="mb-8 p-6 bg-teal-100 dark:bg-teal-900/50 rounded-3xl text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                  <HiOutlineCalendarDays className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Secure Your Future
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Protect yourself and your loved ones with emergency funds,
                  smart investments, and long-term financial stability.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mt-20 text-center">
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Financial freedom isn't about having more money —<br />
              it's about having{" "}
              <span className="text-teal-600 dark:text-teal-400">
                more choices
              </span>
              .
            </p>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Start your journey today with FinEase.
            </p>
          </div>
        </div>
      </section>
      <FAQ />
    </div>
  );
};

export default Home;
