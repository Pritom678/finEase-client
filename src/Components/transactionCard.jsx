import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const TransactionCard = ({ txn, index }) => {
  if (!txn) return null;
  return (
    <tr key={txn._id} className="hover:bg-base-100 transition-all">
      <td>{index + 1}</td>
      <td
        className={`font-semibold ${
          txn.type?.toLowerCase() === "income"
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {txn.type}
      </td>
      <td className="font-medium">{txn.category}</td>
      <td className="font-bold">${txn.amount}</td>
      <td className="text-gray-500">{txn.createdAt}</td>
      <td className="space-x-2">
        <Link
          to={`/update-transaction/${txn._id}`}
          className="btn btn-xs bg-primary text-white hover:bg-primary/80"
        >
          Update
        </Link>
        <Link
          to={`/detail-transaction/${txn._id}`}
          className="btn btn-xs bg-secondary text-white hover:bg-secondary/80"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default TransactionCard;
