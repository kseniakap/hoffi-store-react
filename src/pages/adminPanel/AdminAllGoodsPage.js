import React from "react";
import TableOfGoods from "../../adminPanel/tableOfGoods/TableOfGoods";
import { motion } from "framer-motion";
const AdminAllGoodsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TableOfGoods />
    </motion.div>
  );
};

export default AdminAllGoodsPage;
