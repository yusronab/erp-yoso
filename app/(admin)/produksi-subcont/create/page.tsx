import Link from "next/link";
import prisma from "../../../lib/prisma";
import { generateCode } from "@/utils/helper";
import FormOrder from "./form";

const countData = async () => {
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;
    const lastDayISOString = new Date(lastDay).toISOString();

    const result = await prisma.barangSubcont.count({
        where: {
            createdAt: { gte: lastDayISOString }
        }
    })

    return result;
};

const getProducts = async () => {
    const result = await prisma.barangJadi.findMany({
        orderBy: { updatedAt: 'desc' },
        where: { deletedAt: null }
    });

    return result;
};

const getSubcont = async () => {
    const result = await prisma.subcont.findMany({
        orderBy: { name: 'asc' },
    });
    
    return result;
};

const CreatePage = async () => {
    const [counter, products, subcont] = await Promise.all([countData(), getProducts(), getSubcont()]);

    const a = new Date();

    const year = a.getFullYear().toString().slice(-2);
    const month = (a.getMonth() + 1).toString().padStart(2, '0');
    const day = a.getDate().toString().padStart(2, '0');

    const formattedDate = 'BSTJ' + year + month + day;
    const code = generateCode(6, counter + 1, formattedDate);

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li><Link href="/produksi-subcont">Daftar Barang Subcont</Link></li>
                    <li className="text-[#4e73df]">Tambah</li>
                </ul>
            </div>

            <div>
                <h3 className="p-3 bg-gray-100 border">Tambah Barang Subcont</h3>
                <FormOrder code={code} product={products} customer={subcont} />
            </div>
        </div>
    );
};

export default CreatePage;