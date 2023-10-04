import prisma from "../../lib/prisma";
import Content from "./content";

const getOrders = async () => {
  try {
    const result = await prisma.order.findMany({
      where: { deletedAt: null },
      orderBy: { updatedAt: 'desc' },
      include: { customer: true, user: true },
    })

    return result;

  } catch (error) {
    console.log('error get', error);
  }
};

const getStatus = async () => {
  const result = await prisma.status.findMany({
      select: {
          fkey: true,
          bgColor: true,
          fontColor: true,
          name: true,
          module: true,
      },
  });

  return result;
};

const OrderPage = async () => {
  const [dataOrder, statuses] = await Promise.all([getOrders(), getStatus()]);

  return (
    <div className="p-5 w-full">
      <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
        <ul>
          <li><a>Dashboard</a></li>
          <li className="text-[#4e73df]">Penjualan</li>
        </ul>
      </div>

      {dataOrder && <Content data={dataOrder} style={statuses} />}
    </div>
  );
};

export default OrderPage;