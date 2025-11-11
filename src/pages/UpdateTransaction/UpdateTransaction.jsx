import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Spinner from "../../Spinner/Spinner";
import toast from "react-hot-toast";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
    description: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing transaction data
    fetch(`http://localhost:3000/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const tx = data.result || data; // handle both response structures
        setFormData({
          type: tx.type || "",
          category: tx.category?.trim() || "",
          amount: tx.amount || "",
          date: tx.date ? tx.date.split("T")[0] : "",
          description: tx.description || "",
          name: tx.name || "",
          email: tx.email || "",
        });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Transaction updated successfully");
        navigate("/my-transaction");
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-base-200 flex justify-center items-center py-10 px-4"
    >
      <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-lg p-8 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h2 className="text-xl font-bold text-primary">Update Transaction</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div>
            <label className="font-semibold">Type</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleChange}
                  className="radio radio-success"
                />
                Income
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleChange}
                  className="radio radio-error"
                />
                Expense
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="">Select Category</option>

              {/* Income categories */}
              <optgroup label="Income Categories">
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Freelance">Freelance</option>
                <option value="Other">Other</option>
              </optgroup>

              {/* Expense categories */}
              <optgroup label="Expense Categories">
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </optgroup>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="font-semibold">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Add details about this transaction"
            />
          </div>

          {/* Name & Email (Read Only) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly
                className="input input-bordered w-full bg-base-200 mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="input input-bordered w-full bg-base-200 mt-1"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-primary text-white hover:bg-blue-600 border-none w-full mt-4"
          >
            Update Transaction
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateTransaction;
