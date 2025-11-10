import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const TransactionCard = ({ data }) => {
  return (
    <motion.div
      key={data._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: data.index * 0.1 }}
    >
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
            {data.map((txn, index) => (
              <tr key={txn._id} className="hover:bg-base-100 transition-all">
                <td>{index + 1}</td>
                <td
                  className={`font-semibold ${
                    txn.type === "Income" ? "text-secondary" : "text-accent"
                  }`}
                >
                  {txn.type}
                </td>
                <td className="font-medium">{txn.category}</td>
                <td className="font-bold text-near">${txn.amount}</td>
                <td className="text-gray-500">{txn.date}</td>
                <td className="space-x-2">
                  <Link
                    to="/update-transaction"
                    className="btn btn-xs bg-primary text-white hover:bg-primary/80"
                  >
                    Update
                  </Link>
                  <button className="btn btn-xs bg-accent text-white hover:bg-accent/80">
                    Delete
                  </button>
                  <Link
                    to="/detail-transaction"
                    className="btn btn-xs bg-secondary text-white hover:bg-secondary/80"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
