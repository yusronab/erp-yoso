import LineChart from "@/components/LineChart";
import ListDashboardCard from "@/components/ListDashboardCard";

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