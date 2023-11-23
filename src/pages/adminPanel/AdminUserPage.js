import React from "react";
import TableOfUsers from "../../adminPanel/tableOfUsers/TableOfUsers";
import { motion } from "framer-motion";
const AdminUserPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TableOfUsers />
    </motion.div>
  );
};

export default AdminUserPage;
