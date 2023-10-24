import Widgets from "../../adminPanel/widgets/Widgets";
import Featured from "../../adminPanel/featured/Featured";
import Chart from "../../adminPanel/chart/Chart";

const AdminMainPage = () => {
  return (
    <>
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
    </>
  );
};

export default AdminMainPage;
