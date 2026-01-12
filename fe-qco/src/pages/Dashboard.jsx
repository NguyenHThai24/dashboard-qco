import Header from "../components/Header";
import CartTotal from "../components/CardTotal";
import DoubleBarChart from "../components/DoubleBarChart";
function Dashboard() {
  return (
    <section className="flex h-screen flex-col">
      <Header />

      {/* Phần còn lại */}
      <div className="flex flex-1 flex-col gap-3 lg:flex-row">
        {/* Cột 1 */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex h-36 w-full items-center gap-2">
            <div className="h-full w-full">
              <CartTotal title="Total1" />
            </div>
            <div className="h-full w-full">
              <CartTotal title="Total2" />
            </div>
          </div>

          <div className="h-96">
            <DoubleBarChart />
          </div>

          <div>3</div>
        </div>

        {/* Cột 2 */}
        <div className="flex-1 border">2</div>
      </div>
    </section>
  );
}

export default Dashboard;
