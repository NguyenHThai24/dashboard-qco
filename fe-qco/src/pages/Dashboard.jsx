// Dashboard.jsx
import { useState } from "react";
import Header from "../components/Header";
import CartTotal from "../components/CardTotal";
import DoubleBarChart from "../components/DoubleBarChart";

function Dashboard() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    floor: "",
    lean: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <section className="flex h-screen flex-col">
      <Header onFilterChange={handleFilterChange} />

      <div className="flex flex-1 flex-col gap-3 lg:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex h-36 w-full items-center gap-2">
            <div className="h-full w-full">
              <CartTotal title="Total1" filters={filters} />
            </div>
            <div className="h-full w-full">
              <CartTotal title="Total2" filters={filters} />
            </div>
          </div>

          <div className="h-96">
            <DoubleBarChart filters={filters} />
          </div>

          <div>3</div>
        </div>

        <div className="flex-1 border">2</div>
      </div>
    </section>
  );
}

export default Dashboard;
