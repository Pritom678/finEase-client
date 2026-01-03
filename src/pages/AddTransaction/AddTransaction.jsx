import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "expense", // default
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // today by default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a transaction.");
      return;
    }

    if (!formData.type || !formData.category || !formData.amount || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    const transactionData = {
      ...formData,
      email: user.email,
      name: user.displayName || "User",
    };

    try {
      const res = await fetch("https://fin-ease-server-jet.vercel.app/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Transaction added successfully!");
        setFormData({
          type: "expense",
          category: "",
          amount: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        navigate("/my-transaction");
      } else {
        toast.error(data.message || "Failed to add transaction.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  // Dynamic categories based on type
  const incomeCategories = ["Salary", "Freelance", "Business", "Investment", "Gift", "Other"];
  const expenseCategories = ["Food", "Rent", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];

  const categories = formData.type === "income" ? incomeCategories : expenseCategories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Glassmorphic Form Card */}
        <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100">
              Add New Transaction
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
              Track your income and expenses with precision
            </p>

            {/* User Info Header */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-teal-50/50 dark:bg-teal-900/30 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user?.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{user?.displayName || "User"}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Transaction Type - Pill Toggle */}
              <div>
                <label className="block text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Transaction Type
                </label>
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "income", category: "" })}
                    className={`px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                      formData.type === "income"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "expense", category: "" })}
                    className={`px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                      formData.type === "expense"
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Expense
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Category <span className="text-teal-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`py-3 px-5 rounded-xl font-medium transition-all duration-300 border-2 ${
                        formData.category === cat
                          ? "bg-teal-500 text-white border-teal-500 shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-teal-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Amount <span className="text-teal-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-teal-600 dark:text-teal-400">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="input input-lg w-full pl-12 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 text-2xl font-bold"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Date <span className="text-teal-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-lg w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Description <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add notes about this transaction..."
                  className="textarea textarea-lg w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;