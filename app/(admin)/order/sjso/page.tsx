import prisma from "../../../lib/prisma";
import Table from "./table";

export const dynamic = "force-dynamic";

const getSJSO = async () => {
    const result = await prisma.sjso.findMany();

    return result;
};

const getOrders = async () => {
    try {
      const result = await prisma.order.findMany({
        where: { deletedAt: null },
        orderBy: { updatedAt: 'desc' },
        include: {
            customer: true,
            user: true,
            sjso: true,
        },
      })
  
      return result;
  
    } catch (error) {
      console.log('error get', error);
    }
  };

const PageSJSO = async () => {
    const [sjso, orders] = await Promise.all([getSJSO(), getOrders()]);

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li className="text-[#4e73df]">Daftar Surat Jalan</li>
                </ul>
            </div>
            <div className="flex justify-between items-center bg-gray-100 rounded-md p-3">
                <h3 className="font-bold capitalize">data penjualan</h3>
            </div>

            {orders && <Table data={orders} />}
        </div>
    );
};

export default PageSJSO;