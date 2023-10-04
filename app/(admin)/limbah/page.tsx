import prisma from "../../lib/prisma";
import type { Limbah } from "@prisma/client";
import HeadingDetail from "@/components/HeadingDetail";
import TableInventory from "@/components/TableInventory";
import ModalInventory from "@/components/ModalInventory";
import ModalQrcode from "./modal";
import Link from "next/link";
import ModalSell from "./sell";

const getDatas = async () => {
  try {
    const res = await prisma.limbah.findMany({
      select: {
        id: true,
        desc: true,
        total: true,
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
  const listData = await getDatas() as Limbah[];

  const dataExist = listData.filter(item => item.deletedAt === null);
  const dataDeleted = listData.filter(item => item.deletedAt !== null);

  const headingData = [
    {
      id: 'updatedAt',
      tag: 'Tanggal',
    },
    {
      id: 'amount',
      tag: 'Kuantitas',
    },
    {
      id: 'total',
      tag: 'Total',
    },
    {
      id: 'desc',
      tag: 'Keterangan',
    },
  ];

  const inputList = [
    {
      'id': 'amount',
      'label': 'Kuantitas',
      'type': 'number'
    },
    {
        'id': 'desc',
        'label': 'keterangan',
        'type': 'text'
      },
  ];

  const initialState = {
    amount: '',
    desc: ''
  }

  return (
    <div className="p-5 w-full">
      <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
        <ul>
          <li><a>Dashboard</a></li>
          <li className="text-[#4e73df]">Limbah</li>
        </ul>
      </div>
      <div className="flex justify-between bg-gray-100 rounded-md p-3">
        <HeadingDetail
          exist={listData.length}
          deleted={dataDeleted.length}
        />
        <ModalInventory
          title="Tambah Data"
          table="limbah"
          inputList={inputList}
          modalState={initialState}
        />
      </div>
      <div className="flex gap-4 justify-end mt-5">
        <ModalSell />
        <ModalQrcode listItem={dataExist} />
        <Link href="/limbah/list-penjualan" className="btn btn-neutral capitalize">list penjualan</Link>
      </div>
      <TableInventory
        data={dataExist}
        heading={headingData}
        table="limbah"
        inputList={inputList}
      />
    </div>
  )
}

export default MainPage;