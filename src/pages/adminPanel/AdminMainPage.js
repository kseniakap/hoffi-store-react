import Widgets from "../../adminPanel/widgets/Widgets";
import Featured from "../../adminPanel/featured/Featured";
import Chart from "../../adminPanel/chart/Chart";
import { motion } from "framer-motion";

const AdminMainPage = () => {
  return (
    <motion.div  initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      <div className="widgets">
        <Widgets type="user" />
        <Widgets type="order" />
        <Widgets type="erarning" />
        <Widgets type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart />
      </div>
    </motion.div>
  );
};

export default AdminMainPage;
