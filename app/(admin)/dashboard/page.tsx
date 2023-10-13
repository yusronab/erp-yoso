import LineChart from "@/components/LineChart";
import ListDashboardCard from "@/components/ListDashboardCard";
import { ScriptableContext } from "chart.js";

const Dashboard = () => {
  const labels = [
    "2023-01",
    "2023-02",
    "2023-03",
    "2023-04",
    "2023-05",
    "2023-06",
    "2023-07",
  ];

  const datasets = [
    {
      label: "Pembelian Alat",
      data: [100, 120, 115, 134, 168, 132, 200],
      fill: "start",
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(250,174,50,1)");
        gradient.addColorStop(1, "rgba(250,174,50,0)");
        return gradient;
      },
      borderColor: "rgba(75,192,192,1)"
    },
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl">Dashboard</h1>
      <ListDashboardCard />
      <LineChart labels={labels} datasets={datasets} />
    </div>
  )
}

export default Dashboard;