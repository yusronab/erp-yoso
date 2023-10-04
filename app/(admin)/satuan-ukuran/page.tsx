import prisma from "../../lib/prisma";
import CustomTable from "@/components/CustomTable";
import type { Ukuran } from "@prisma/client";
import CustomModal from "@/components/CustomModal";
import HeadingDetail from "@/components/HeadingDetail";

const getDatas = async () => {
  try {
    const res = await prisma.ukuran.findMany({
      select: {
        id: true,
        name: true,
        deletedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      }
    });

    return res;

  } catch (error) {
    console.log('error get', error)
  }
}

const MainPage = async () => {
  const listUkuran = await getDatas() as Ukuran[];

  const ukuranExist = listUkuran.filter(item => item.deletedAt === null);
  const ukuranDeleted = listUkuran.filter(item => item.deletedAt !== null);

  return (
    <div className="p-5 w-full">
      <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
        <ul>
          <li><a>Dashboard</a></li>
          <li className="text-[#4e73df]">Ukuran</li>
        </ul>
      </div>
      <div className="flex justify-between bg-gray-100 rounded-md p-3">
        <HeadingDetail
          exist={listUkuran.length}
          deleted={ukuranDeleted.length}
        />
        <CustomModal
          title="Tambah Data"
          table="ukuran"
          inputList={['name']}
          state={{ name: '' }}
        />
      </div>
      <CustomTable
        data={ukuranExist}
        heading={["name"]}
        table="ukuran"
        inputList={['name']}
      />
    </div>
  )
}

export default MainPage;