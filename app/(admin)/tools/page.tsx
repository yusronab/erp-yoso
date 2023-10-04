import prisma from "../../lib/prisma";
import type { Tools } from "@prisma/client";
import HeadingDetail from "@/components/HeadingDetail";
import TableInventory from "@/components/TableInventory";
import ModalInventory from "@/components/ModalInventory";

const getDatas = async () => {
  try {
    const res = await prisma.tools.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        desc: true,
        amount: true,
        updatedAt: true,
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
  const listData = await getDatas() as Tools[];

  const dataExist = listData.filter(item => item.deletedAt === null);
  const dataDeleted = listData.filter(item => item.deletedAt !== null);

  const headingData = [
    {
      id: 'code',
      tag: 'Kode',
    },
    {
      id: 'name',
      tag: 'Nama',
    },
    {
      id: 'amount',
      tag: 'Jumlah',
    },
    {
      id: 'desc',
      tag: 'Keterangan',
    },
  ];

  const inputList = [
    {
      'id': 'name',
      'label': 'nama',
      'type': 'text'
    },
    {
      'id': 'amount',
      'label': 'jumlah',
      'type': 'number'
    },
    {
        'id': 'desc',
        'label': 'keterangan',
        'type': 'text'
      },
  ];

  const initialState = {
    name: '',
    amount: '',
    desc: ''
  }

  return (
    <div className="p-5 w-full">
      <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
        <ul>
          <li><a>Dashboard</a></li>
          <li className="text-[#4e73df]">Peralatan</li>
        </ul>
      </div>
      <div className="flex justify-between bg-gray-100 rounded-md p-3">
        <HeadingDetail
          exist={listData.length}
          deleted={dataDeleted.length}
        />
        <ModalInventory
          title="Tambah Data"
          table="tools"
          inputList={inputList}
          modalState={initialState}
        />
      </div>
      <TableInventory
        data={dataExist}
        heading={headingData}
        table="tools"
        inputList={inputList}
      />
    </div>
  )
}

export default MainPage;