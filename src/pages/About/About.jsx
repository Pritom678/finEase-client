import React from "react";
import { Shield, TrendingUp, Smartphone, Lock, Zap, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            About FinEase
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Your trusted companion for smart, simple, and secure personal
            finance management. Take control of your money with confidence.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At FinEase, we believe financial freedom should be accessible to
              everyone. We're on a mission to empower individuals with intuitive
              tools that make tracking income, expenses, and savings effortless
              — so you can focus on living your best life, not crunching
              numbers.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-4 bg-teal-100 dark:bg-teal-900/50 rounded-2xl w-fit mb-6">
                <Zap className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Instantly track transactions, view reports, and gain insights —
                all with a smooth, responsive experience.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl w-fit mb-6">
                <Shield className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your financial data is encrypted and never shared. We prioritize
                your privacy above everything.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-2xl w-fit mb-6">
                <Smartphone className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Always With You
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your finances anytime, anywhere — fully optimized for
                desktop and mobile.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-4 bg-violet-100 dark:bg-violet-900/50 rounded-2xl w-fit mb-6">
                <TrendingUp className="w-10 h-10 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Smart Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful charts and reports help you understand spending
                patterns and grow your savings.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-4 bg-amber-100 dark:bg-amber-900/50 rounded-2xl w-fit mb-6">
                <Lock className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Bank-Level Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Industry-standard encryption and secure authentication keep your
                data safe at all times.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="p-4 bg-rose-100 dark:bg-rose-900/50 rounded-2xl w-fit mb-6">
                <Users className="w-10 h-10 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Built for Everyone
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Whether you're saving for a goal or just starting out, FinEase
                grows with your financial journey.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands who are already making smarter financial decisions
            with FinEase. Simple. Secure. Powerful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
