import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  DollarSign,
  User,
} from "lucide-react";
import Spinner from "../../Spinner/Spinner";

const DetailTransaction = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // Fetch specific transaction by ID
    fetch(`http://localhost:3000/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => setTransaction(data.result))
      .catch((err) => console.error(err));
  }, [id]);

  if (!transaction) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-base-200 flex justify-center items-center py-10 px-4"
    >
      <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-lg p-8 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/my-transaction"
            className="btn btn-ghost btn-sm flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span
            className={`badge ${
              isIncome ? "badge-success" : "badge-error"
            } px-3 py-2 text-sm`}
          >
            {isIncome ? "Income" : "Expense"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Transaction Details
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Review your transaction info below
        </p>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <DollarSign className="text-secondary w-5 h-5" />
            <p className="font-semibold text-lg">
              Amount:{" "}
              <span
                className={`${
                  isIncome ? "text-green-600" : "text-red-500"
                } font-bold`}
              >
                ৳{transaction.amount}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="text-secondary w-5 h-5" />
            <p className="font-semibold text-lg">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {transaction.category}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-secondary w-5 h-5" />
            <p className="font-semibold text-lg">
              Date:{" "}
              <span className="font-medium text-gray-700">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <User className="text-secondary w-5 h-5" />
            <p className="font-semibold text-lg">
              Added by:{" "}
              <span className="font-medium text-gray-700">
                {transaction.name} ({transaction.email})
              </span>
            </p>
          </div>

          {transaction.description && (
            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-2">Description</h4>
              <p className="bg-base-200 rounded-xl p-3 text-gray-700">
                {transaction.description}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-8">
          <Link
            to={`/update-transaction/${transaction._id}`}
            className="btn bg-primary text-white hover:bg-blue-600 border-none rounded-full px-6"
          >
            Edit
          </Link>
          <button className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full px-6">
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailTransaction;
