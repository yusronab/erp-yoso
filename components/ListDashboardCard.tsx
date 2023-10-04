import DashboardCard from "./DashboardCard";

const ListDashboardCard = () => {
    return (
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-4 py-5 gap-5">
            <DashboardCard
                title="Total Sales Order"
                total="4,152,783,787"
                color="blue"
            />
            <DashboardCard
                title="Total Purchase Order"
                total="4,152,783,787"
                color="green"
            />
            <DashboardCard
                title="Total Penjualan Limbah"
                total="4,152,783,787"
                color="teal"
            />
            <DashboardCard
                title="Gross Pendapatan"
                total="4,152,783,787"
                color="yellow"
            />
        </div>
    )
}

export default ListDashboardCard;