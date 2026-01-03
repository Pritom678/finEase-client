import React from "react";
import { HiOutlineStar } from "react-icons/hi2";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelancer",
    text: "FinEase transformed how I manage my irregular income. The insights and budgeting tools are game-changers!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    text: "Finally, an app that’s simple yet powerful. Tracking expenses and planning for taxes has never been easier.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Teacher",
    text: "I love the goal tracking! I’m on track to pay off my student loans 2 years early thanks to FinEase.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-teal-50/50 to-emerald-50/30 dark:from-gray-900 dark:to-[#0f172a]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Loved by Thousands
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16">
          Real people, real results.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-3 transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                {[...Array(t.rating)].map((_, s) => (
                  <HiOutlineStar key={s} className="w-8 h-8 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-8">
                "{t.text}"
              </p>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-100">{t.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;