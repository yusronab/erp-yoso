import { DashboardCardProps } from "@/types"
import { FaMoneyBill } from "react-icons/fa"

const DashboardCard = ({ title, total, color }: DashboardCardProps) => {
    const colorBg: any = {
        blue: 'before:bg-blue-600',
        green: 'before:bg-green-600',
        teal: 'before:bg-teal-600',
        yellow: 'before:bg-yellow-600',
    }

    const colorText: any = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        teal: 'text-teal-600',
        yellow: 'text-yellow-600',
    }

    return (
        <div className={`flex p-3 rounded-md border-l-2 relative before:absolute shadow-md items-center
        justify-between before:w-1 ${colorBg[color]} before:h-full group before:top-0 
        before:left-0 before:rounded-md hover:before:w-full before:transition-all before:duration-300`}>
            <div className="flex flex-col gap-3 z-[1] group-hover:text-white">
                <span className={`${colorText[color]} group-hover:text-white`}>{title.toUpperCase()}</span>
                <span>Rp. {total}</span>
            </div>
            <span></span>
            <FaMoneyBill size={30} className="text-slate-400 z-[1] group-hover:text-white" />
        </div>
    )
}

export default DashboardCard