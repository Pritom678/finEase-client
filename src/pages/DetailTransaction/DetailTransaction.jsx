import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { HiArrowLeft, HiCalendarDays, HiCreditCard, HiCurrencyDollar, HiUser, HiPencil, HiTrash } from "react-icons/hi2";
import Spinner from "../../Spinner/Spinner";
import Swal from "sweetalert2";

const DetailTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fin-ease-server-jet.vercel.app/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data.result || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://fin-ease-server-jet.vercel.app/transactions/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Transaction has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/my-transaction");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to delete transaction", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-teal-50/20 dark:from-gray-900 dark:to-[#0f172a]">
        <Spinner />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-2xl text-gray-600 dark:text-gray-400">Transaction not found</p>
      </div>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphic Detail Card */}
        <div className="relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-3 px-6 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
              >
                <HiArrowLeft className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Back to Transactions</span>
              </button>

              <span
                className={`px-6 py-3 rounded-full font-bold text-lg shadow-md ${
                  isIncome
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
                }`}
              >
                {isIncome ? "Income" : "Expense"}
              </span>
            </div>

            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
              Transaction Details
            </h2>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
              Full overview of this recorded transaction
            </p>

            {/* Main Amount */}
            <div className="text-center mb-12">
              <p className="text-6xl font-extrabold text-gray-800 dark:text-gray-100">
                <span className={isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                  {isIncome ? "+" : "-"}
                </span>
                ${Number(transaction.amount).toLocaleString()}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-xl">
                    <HiCreditCard className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {transaction.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-xl">
                    <HiCalendarDays className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-xl">
                    <HiUser className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Added By</p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {transaction.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {transaction.description && (
              <div className="mb-12">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Notes</p>
                <div className="bg-gray-100/70 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {transaction.description}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-6">
              <Link
                to={`/edit-transaction/${transaction._id}`}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <HiPencil className="w-5 h-5" />
                Edit Transaction
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-3 px-8 py-4 bg-white/70 dark:bg-gray-700/70 hover:bg-red-500/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold rounded-2xl border-2 border-red-500/50 dark:border-red-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <HiTrash className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaction;