import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  HiOutlineChartPie,
  HiOutlineCalendarDays,
  HiOutlineScissors,
  HiOutlineBanknotes,
} from "react-icons/hi2";
import { Link } from "react-router";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://www.experian.com/blogs/ask-experian/wp-content/uploads/Piggy-Bank-Next-To-Calculator-And-Coins-With-Person-In-Background.jpg",
      title: "Build a Strong Emergency Fund",
      desc: "Aim for 3–6 months of essential expenses in a high-yield savings account. It protects you from unexpected events and reduces financial stress.",
    },
    {
      image:
        "https://www.fidelity.com/bin-public/600_Fidelity_Com_English/images/learning-center/charts-and-graphics/retirement%20guidelines-10x%20journey.png",
      title: "Maximize Your Retirement Savings",
      desc: "Contribute enough to get your full employer match and increase contributions annually. Start early to harness the power of compound growth.",
    },
    {
      image:
        "https://www.incharge.org/wp-content/uploads/2017/03/High-Interest-Credit-Card.jpg",
      title: "Pay Off High-Interest Debt First",
      desc: "Tackle credit cards and loans aggressively. Reducing high-interest debt frees up money for saving and investing faster.",
    },
    {
      image:
        "https://files.consumerfinance.gov/f/images/cfpb_SSSU_transfer_automatic_check.original.png",
      title: "Automate Your Savings",
      desc: "Set up automatic transfers to savings and investment accounts right after payday. Pay yourself first and watch your wealth grow effortlessly.",
    },
    {
      image:
        "https://res.cloudinary.com/do3iu9q7d/image/upload/v1767425205/1722340744668_x44ufh.jpg",
      title: "Follow the 50/30/20 Rule",
      desc: "Allocate 50% to needs, 30% to wants, and 20% to savings/debt. This simple framework keeps your finances balanced and sustainable.",
    },
    {
      image:
        "https://www.citizensbank.com/assets/CB_media/images/infographics/What-is-Diversification_Micrographic_v5.jpg",
      title: "Review and Rebalance Investments",
      desc: "Check your portfolio annually and adjust to stay aligned with your goals and risk tolerance. Diversification is key to long-term success.",
    },
    {
      image:
        "https://topflightapps.com/wp-content/uploads/2020/10/mint-personal-finance-budgeting-app.jpg",
      title: "Track Spending Weekly",
      desc: "Regular monitoring helps spot leaks early and keeps you accountable. Small adjustments add up to big savings over time.",
    },
    {
      image:
        "https://www.self.inc/info/img/post/cost-of-unused-paid-subscriptions/cost-of-unused-paid-subscriptions-header.jpg",
      title: "Cut Unused Subscriptions",
      desc: "Audit recurring charges monthly. Eliminating just a few unused services can save hundreds of dollars each year.",
    },
  ];

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

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
    <div>
      {/* Hero Slider – Text on Left + CTA Buttons */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Text & Buttons – Left Aligned */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-teal-100 mb-10 leading-relaxed drop-shadow-lg">
              {slides[currentSlide].desc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/about" // Change this if your about page has a different route
                className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-teal-400 w-10"
                  : "bg-white/60 hover:bg-white/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* The rest of your component (Overview, Tips, Why Planning) remains unchanged */}
      {/* Financial Overview */}
      {/* Ultimate Modern Financial Overview – 2025/2026 Fintech Premium Style */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
          Your Financial Overview
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Glassmorphic Income/Expense Details + Circular Flow Ring */}
          <div className="lg:col-span-5 space-y-8">
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
          <div className="lg:col-span-7">
            <div className="relative bg-gradient-to-br from-teal-600/90 via-teal-500/90 to-emerald-600/90 dark:from-teal-800/90 dark:via-teal-700/90 dark:to-emerald-800/90 backdrop-blur-xl rounded-3xl p-12 text-white shadow-2xl border border-white/10 overflow-hidden">
              {/* Floating glow orbs */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-teal-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

              <p className="text-teal-100 text-xl font-medium mb-4">
                Current Balance
              </p>
              <p className="text-7xl md:text-8xl lg:text-9xl font-extrabold drop-shadow-2xl">
                ${overview.balance.toLocaleString()}
              </p>

              {/* Savings Rate & Insight */}
              {overview.totalIncome > 0 && (
                <div className="mt-10 flex items-center gap-6">
                  <div
                    className={`text-5xl font-bold ${
                      overview.balance >= 0
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {overview.balance >= 0 ? "+" : ""}
                    {Math.round(
                      (overview.balance / overview.totalIncome) * 100
                    )}
                    %
                  </div>
                  <div>
                    <p className="text-teal-100 text-lg">Savings Rate</p>
                    <p className="text-teal-50 text-sm mt-1 max-w-sm">
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

      {/* Smart Budgeting Tips */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
            Smart Budgeting Strategies
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto text-lg">
            Proven principles to help you manage money wisely and build
            long-term financial security.
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

      {/* App Features Showcase */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-[#0f172a]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
            Powerful Features for Smarter Finance
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto text-lg">
            Everything you need to track, budget, and grow your money — all in
            one secure place.
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

      {/* Why Financial Planning Matters – Modern & Impactful */}
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
    </div>
  );
};

export default Home;
