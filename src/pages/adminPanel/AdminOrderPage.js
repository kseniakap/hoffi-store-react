import React from "react";
import TableOfOrders from "../../adminPanel/tableOfOrders/TableOfOrders";
import { motion } from "framer-motion";
const AdminOrderPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TableOfOrders />
    </motion.div>
  );
};

export default AdminOrderPage;
