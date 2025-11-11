import React from "react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";
import TransactionCard from "../../Components/transactionCard";


const MyTransaction = () => {
  const data = useLoaderData();
  
  return (
    <div className="min-h-screen bg-base-100 py-10 px-5 md:px-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Transactions
      </motion.h2>
    
      <TransactionCard key={data._id} data={data}></TransactionCard>
    </div>
  );
};

export default MyTransaction;
