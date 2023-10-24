import React from "react";
import "./../style/style.scss";
import FinishOrder from "../components/finishOrder/FinishOrder";
import { motion } from "framer-motion";
// Финальное оформление заказа
const FinishPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <FinishOrder />
      </div>
    </motion.div>
  );
};

export default FinishPage;
