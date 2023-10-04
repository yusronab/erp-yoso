
import HeadingDetail from "@/components/HeadingDetail";
import Link from "next/link";
import prisma from "../../lib/prisma";
import Table from "./table";

const getDatas = async () => {
  try {
    const res = await prisma.material.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { suplier: true, ukuran: true }
    });

    return res;

  } catch (error) {
    console.log('error material', error)
  }
}

const getUkuran = async () => {
  try {
    const res = await prisma.ukuran.findMany({
      select: { id: true, name: true }
    })

    return res;

  } catch (error) {
    console.log('error ukuran', error)
  }
}

const getSuplier = async () => {
  try {
    const res = await prisma.suplier.findMany({
      select: { id: true, name: true }
    })

    return res;

  } catch (error) {
    console.log('error suplier', error)
  }
}

const MaterialPage = async () => {
  const [listData, suplier, ukuran] = await Promise.all([getDatas(), getSuplier(), getUkuran()])

  const dataExist = listData ? listData.filter(item => item.deletedAt === null) : [];
  const dataDeleted = listData ? listData.filter(item => item.deletedAt !== null) : [];

  return (
    <div className="p-5 w-full">
      <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
        <ul>
          <li><a>Dashboard</a></li>
          <li className="text-[#4e73df]">Material</li>
        </ul>
      </div>

      <div className="flex justify-between items-center bg-gray-100 rounded-md p-3">
        <HeadingDetail
          exist={dataExist.length}
          deleted={dataDeleted.length}
        />
        <Link
          href="/material/create"
          className="btn btn-primary capitalize"
        >
          Tambah data
        </Link>
      </div>
      {ukuran && suplier && (
        <Table
          data={dataExist}
          suplier={suplier}
          ukuran={ukuran}
        />
      )}
    </div>
  )
}

export default MaterialPage;