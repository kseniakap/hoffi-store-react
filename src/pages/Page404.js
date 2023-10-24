import React from "react";
import { motion } from "framer-motion";

const Page404 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">Упс...Такой страниц нет</div>
    </motion.div>
  );
};

export default Page404;
