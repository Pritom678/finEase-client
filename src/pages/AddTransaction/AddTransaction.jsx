import React, { useState, useContext } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.type ||
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const transactionData = {
      ...formData,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
    };

    console.log(transactionData);

    toast.success("Transaction added successfully!");
    setFormData({
      type: "",
      category: "",
      amount: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 py-10">
      <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Transaction Type
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span className="text-near font-medium">Income</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleChange}
                  className="radio radio-accent"
                />
                <span className="text-near font-medium">Expense</span>
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full bg-base-200 border-secondary text-near"
              required
            >
              <option value="">Select Category</option>

              {/* Income categories */}
              <optgroup label="Income Categories">
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Freelance">Freelance</option>
                <option value="Other Income">Other</option>
              </optgroup>

              {/* Expense categories */}
              <optgroup label="Expense Categories">
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other Expense">Other</option>
              </optgroup>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="input input-bordered w-full bg-base-200 border-secondary placeholder-gray-500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-secondary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional details about this transaction"
              className="textarea textarea-bordered w-full bg-base-200 border-secondary placeholder-gray-500"
              rows="3"
            ></textarea>
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="userName"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-base-200 border-secondary text-near"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="userEmail"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200 border-secondary text-near"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-primary text-white hover:bg-secondary border-none rounded-full mt-4"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
