import CartItem from "./CartItem";
import { useDashboardData } from "../hooks/useDashboardData";
import { getTotalAPI, getTotalCompleteAPI } from "../api/dashboardAPI";

function CartData({ filters }) {
  // Dùng custom hook cho từng loại thống kê
  const totalData = useDashboardData(filters, getTotalAPI);
  const completeData = useDashboardData(filters, getTotalCompleteAPI);

  return (
    <>
      <div className="h-full w-full">
        <CartItem
          title="Tổng lệnh"
          color="#6366f1"
          total={totalData.total}
          chartData={totalData.chartData}
          diffPercent={totalData.diffPercent}
        />
      </div>

      <div className="h-full w-full">
        <CartItem
          title="Hoàn thành"
          color="#0DB307"
          total={completeData.total}
          chartData={completeData.chartData}
          diffPercent={completeData.diffPercent}
        />
      </div>
    </>
  );
}

export default CartData;
