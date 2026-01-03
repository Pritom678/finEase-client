import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const faqs = [
  {
    q: "Is my financial data secure?",
    a: "Yes! We use bank-level 256-bit encryption and never sell your data.",
  },
  {
    q: "Can I connect my bank accounts?",
    a: "Coming soon! Automatic syncing with major banks is in development.",
  },
  {
    q: "Is FinEase free to use?",
    a: "Core features are free forever. Premium insights and reports coming soon.",
  },
  {
    q: "Can I export my data?",
    a: "Yes! Export transactions and reports anytime in CSV or PDF format.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-teal-50/50 dark:hover:bg-teal-900/30 transition-colors"
              >
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {faq.q}
                </p>
                {openIndex === i ? (
                  <HiOutlineMinus className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                ) : (
                  <HiOutlinePlus className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;