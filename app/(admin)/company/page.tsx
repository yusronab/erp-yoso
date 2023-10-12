import { authOptions } from "@/app/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link"
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";
import ListComponent from "./list";

export const dynamic = "force-dynamic";

const getCompany = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;

  if (!id) redirect('/login');

  const result = await prisma.company.findMany({
    where: { userId: Number(id) },
    include: { user: true },
  });

  return result;
};

export const metadata: Metadata = {
  title: 'Yoso Mekatama | Company',
  description: 'List user company',
}

const CompanyPage = async () => {
  const listCompany = await getCompany();

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-lg">Perusahaan yang dimiliki</h2>
        <Link href="/company/create" className="btn btn-primary capitalize">tambah data</Link>
      </div>
      <ListComponent datas={listCompany} />
    </div>
  );
};

export default CompanyPage;