import prisma from "../../lib/prisma";
import type { BarangJadi } from "@prisma/client";
import HeadingDetail from "@/components/HeadingDetail";
import TableInventory from "@/components/TableInventory";
import ModalInventory from "@/components/ModalInventory";

const getDatas = async () => {
  try {
    const res = await prisma.barangJadi.findMany({
      select: {
        id: true,
        name: true,
        number: true,
        qty: true,
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
  const listData = await getDatas() as BarangJadi[];

  const dataExist = listData.filter(item => item.deletedAt === null);
  const dataDeleted = listData.filter(item => item.deletedAt !== null);

  const headingData = [
    {
      id: 'number',
      tag: 'Kode',
    },
    {
      id: 'name',
      tag: 'Nama',
    },
    {
      id: 'qty',
      tag: 'Jumlah',
    },
    {
      id: 'updatedAt',
      tag: 'Tanggal',
    },
  ];

  const inputList = [
    {
      'id': 'number',
      'label': 'kode',
      'type': 'text'
    },
    {
      'id': 'name',
      'label': 'nama',
      'type': 'text'
    },
    {
      'id': 'qty',
      'label': 'jumlah',
      'type': 'number'
    },
  ];

  const initialState = {
    name: '',
    number: '',
    qty: ''
  }

  return (
    <div className="p-5 w-full">
      <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
        <ul>
          <li><a>Dashboard</a></li>
          <li className="text-[#4e73df]">Barang Jadi</li>
        </ul>
      </div>
      <div className="flex justify-between bg-gray-100 rounded-md p-3">
        <HeadingDetail
          exist={listData.length}
          deleted={dataDeleted.length}
        />
        <ModalInventory
          title="Tambah Data"
          table="barang-jadi"
          inputList={inputList}
          modalState={initialState}
        />
      </div>
      <TableInventory
        data={dataExist}
        heading={headingData}
        table="barang-jadi"
        inputList={inputList}
      />
    </div>
  )
}

export default MainPage;