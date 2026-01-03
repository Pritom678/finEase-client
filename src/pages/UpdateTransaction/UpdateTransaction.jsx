import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
    date: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fin-ease-server-jet.vercel.app/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const tx = data.result || data;
        setFormData({
          type: tx.type || "expense",
          category: tx.category?.trim() || "",
          amount: tx.amount || "",
          date: tx.date ? tx.date.split("T")[0] : "",
          description: tx.description || "",
          name: tx.name || "",
          email: tx.email || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load transaction", {
          style: {
            background: "#ef4444",
            color: "white",
            fontWeight: "bold",
            borderRadius: "16px",
            padding: "16px 20px",
          },
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (newType) => {
    setFormData((prev) => ({ ...prev, type: newType, category: "" }));
  };

  const handleCategorySelect = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount || !formData.date) {
      toast.error("Please fill in all required fields", {
        style: {
          background: "#ef4444",
          color: "white",
          fontWeight: "bold",
          borderRadius: "16px",
          padding: "16px 20px",
        },
      });
      return;
    }

    try {
      const res = await fetch(
        `https://fin-ease-server-jet.vercel.app/transactions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            amount: Number(formData.amount),
          }),
        }
      );

      if (res.ok) {
        toast.success("Transaction updated successfully!", {
          style: {
            background: "#14b8a6",
            color: "white",
            fontWeight: "bold",
            borderRadius: "16px",
            padding: "16px 20px",
          },
        });
        navigate("/dashboard/my-transaction");
      } else {
        toast.error("Failed to update transaction", {
          style: {
            background: "#ef4444",
            color: "white",
            fontWeight: "bold",
            borderRadius: "16px",
            padding: "16px 20px",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        style: {
          background: "#ef4444",
          color: "white",
          fontWeight: "bold",
          borderRadius: "16px",
          padding: "16px 20px",
        },
      });
    }
  };

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other",
  ];
  const expenseCategories = [
    "Food",
    "Rent",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Travel",
    "Other",
  ];

  const categories =
    formData.type === "income" ? incomeCategories : expenseCategories;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-teal-50/20 dark:from-gray-900 dark:to-[#0f172a]">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Professional Glassmorphic Card */}
        <div className="relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-5 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
              >
                <HiArrowLeft className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Back
                </span>
              </button>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                Update Transaction
              </h2>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-5 mb-10 p-5 bg-teal-50/60 dark:bg-teal-900/30 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {formData.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {formData.name || "User"}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {formData.email}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Transaction Type */}
              <div>
                <label className="block text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Transaction Type
                </label>
                <div className="flex justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => handleTypeChange("income")}
                    className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md ${
                      formData.type === "income"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange("expense")}
                    className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md ${
                      formData.type === "expense"
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Expense
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Category <span className="text-teal-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                      className={`py-4 px-6 rounded-xl font-medium transition-all duration-300 border-2 ${
                        formData.category === cat
                          ? "bg-teal-500 text-white border-teal-600 shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-teal-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Amount <span className="text-teal-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-teal-600 dark:text-teal-400">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="input input-lg w-full pl-16 text-2xl font-semibold bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Date <span className="text-teal-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Description <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Update notes or details..."
                  className="textarea textarea-lg w-full text-base bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Update Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransaction;
