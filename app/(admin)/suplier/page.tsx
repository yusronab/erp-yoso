import prisma from "../../lib/prisma";
import CustomTable from "@/components/CustomTable";
import type { Suplier } from "@prisma/client";
import CustomModal from "@/components/CustomModal";
import HeadingDetail from "@/components/HeadingDetail";

const getDatas = async () => {
  try {
    const res = await prisma.suplier.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        fax: true,
        phone: true,
        deletedAt: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return res;

  } catch (error) {
    console.log('error get', error)
  }
}

const MainPage = async () => {
  const listData = await getDatas() as Suplier[];

  const dataExist = listData.filter(item => item.deletedAt === null);
  const dataDeleted = listData.filter(item => item.deletedAt !== null);

  return (
    <div className="p-5 w-full">
      <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
        <ul>
          <li><a>Dashboard</a></li>
          <li className="text-[#4e73df]">Suplier</li>
        </ul>
      </div>
      <div className="flex justify-between bg-gray-100 rounded-md p-3">
        <HeadingDetail
          exist={listData.length}
          deleted={dataDeleted.length}
        />
        <CustomModal
          title="Tambah Data"
          table="suplier"
          inputList={['name', 'phone', 'fax', 'address']}
          state={{ name: '', phone: '', fax: '', address: '' }}
        />
      </div>
      <CustomTable
        data={dataExist}
        heading={["name", "address", "phone", "fax"]}
        table="suplier"
        inputList={['name', 'phone', 'fax', 'address']}
      />
    </div>
  )
}

export default MainPage;