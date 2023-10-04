import Link from "next/link"
import FormOrder from "./form"
import prisma from "../../../lib/prisma"
import { generateCode } from "@/utils/helper";

const countData = async () => {
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;
    const lastDayISOString = new Date(lastDay).toISOString();

    const result = await prisma.product.count({
        where: {
            createdAt: { gte: lastDayISOString }
        }
    })

    return result;
}

const getProducts = async () => {
    const result = await prisma.product.findMany({
        include: { satuan: true },
        orderBy: { updatedAt: 'desc' },
        where: { deletedAt: null }
    });

    return result;
}

const CreatePage = async () => {
    const [counter, products] = await Promise.all([countData(), getProducts()]);

    const a = new Date();

    const year = a.getFullYear().toString().slice(-2);
    const month = (a.getMonth() + 1).toString().padStart(2, '0');
    const day = a.getDate().toString().padStart(2, '0');

    const formattedDate = 'YM' + year + month + day;
    const code = generateCode(6, counter + 1, formattedDate);

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li><Link href="/order">Penjualan</Link></li>
                    <li className="text-[#4e73df]">Order YM</li>
                </ul>
            </div>

            <div>
                <h3 className="p-3 bg-gray-100 border">Order YM</h3>
                <FormOrder code={code} product={products} />
            </div>
        </div>
    );
};

export default CreatePage;