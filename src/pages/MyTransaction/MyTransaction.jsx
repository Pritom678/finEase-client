import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { useLoaderData } from "react-router";
import TransactionCard from "../../Components/transactionCard";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../Spinner/Spinner";

const MyTransaction = () => {
  // const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState("date"); // "date" or "amount"
  const [order, setOrder] = useState("desc"); // "asc" or "desc"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.email) return; // wait for user to load

    setLoading(true);
    fetch(
      `http://localhost:3000/transactions?email=${user.email}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.fixedTransactions)) {
          setTransactions(result.fixedTransactions);
        } else {
          setTransactions([]);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [user, sortBy, order]);

  return (
    <div className="min-h-screen bg-base-100 py-10 px-5 md:px-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Transactions
      </motion.h2>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered bg-base-200 border-secondary"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="select select-bordered bg-base-200 border-secondary"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto bg-base-200 rounded-xl shadow-md">
          <table className="table w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn, index) => (
                <TransactionCard key={txn._id} txn={txn} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTransaction;
