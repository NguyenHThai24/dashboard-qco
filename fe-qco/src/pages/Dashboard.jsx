import Header from "../components/Header";
import CartTotal from "../components/CardTotal";
function Dashboard() {
  return (
    <section className="h-screen flex flex-col">
      <Header />

      {/* Phần còn lại */}
      <div className="flex gap-3 flex-1">
        <div className="flex-1">
          <div className="flex gap-2 w-full h-36 items-center">
            <div className="w-full h-full">
              <CartTotal title="Total1" />
            </div>
            <div className="w-full h-full">
              <CartTotal title="Total2" />
            </div>
          </div>
          <div>2</div>
          <div>3</div>
        </div>
        <div className="border flex-1">2</div>
      </div>
    </section>
  );
}

export default Dashboard;
