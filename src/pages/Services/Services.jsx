import React from "react";
import { 
  PieChart, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone, 
  BellRing, 
  Target,
  Wallet,
  FileText
} from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Everything you need to manage your finances with ease, clarity, and confidence — all in one place.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Service 1: Expense Tracking */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-5 bg-teal-100 dark:bg-teal-900/50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="w-12 h-12 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Smart Expense Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Automatically categorize transactions, add custom tags, and track every dollar with precision.
              </p>
            </div>
          </div>

          {/* Service 2: Visual Reports */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-5 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <PieChart className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Beautiful Reports & Charts
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Gain deep insights with interactive pie charts, trends, and spending breakdowns by category.
              </p>
            </div>
          </div>

          {/* Service 3: Goal Setting */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-5 bg-blue-100 dark:bg-blue-900/50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Savings Goals
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Set and track financial goals — from emergency funds to dream vacations — with progress tracking.
              </p>
            </div>
          </div>

          {/* Service 4: Budget Planning */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-5 bg-violet-100 dark:bg-violet-900/50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-12 h-12 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Custom Budgets
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Create monthly or custom budgets per category and get alerts when you're close to limits.
              </p>
            </div>
          </div>

          {/* Service 5: Mobile Access */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-5 bg-amber-100 dark:bg-amber-900/50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-12 h-12 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Mobile-First Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Fully responsive app — manage your money seamlessly on desktop, tablet, or phone.
              </p>
            </div>
          </div>

          {/* Service 6: Secure & Private */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-5 bg-rose-100 dark:bg-rose-900/50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-12 h-12 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Bank-Level Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your data is encrypted and protected with industry-leading security practices.
              </p>
            </div>
          </div>
        </div>

        {/* Bonus Section: Additional Features */}
        <div className="mt-20 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center justify-center gap-4">
              <BellRing className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              More Coming Soon
              <FileText className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              We're constantly improving FinEase with new features like:
            </p>
            <ul className="mt-8 text-lg text-gray-600 dark:text-gray-400 space-y-3 max-w-2xl mx-auto">
              <li className="flex items-center gap-3"><span className="text-teal-500">•</span> Recurring transaction detection</li>
              <li className="flex items-center gap-3"><span className="text-teal-500">•</span> Net worth tracking over time</li>
              <li className="flex items-center gap-3"><span className="text-teal-500">•</span> Export reports to PDF/CSV</li>
              <li className="flex items-center gap-3"><span className="text-teal-500">•</span> Multi-currency support</li>
            </ul>
          </div>
        </div>

        {/* Closing Call to Action */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Start managing your money the smart way — today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;