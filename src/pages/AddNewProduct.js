import React from "react";
import AddNewGood from "../components/addNewGood/AddNewGood";
import { motion } from "framer-motion";
const AddNewProduct = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AddNewGood />
    </motion.div>
  );
};

export default AddNewProduct;
