import prisma from "../../lib/prisma";
import Content from "./content";

const getItems = async () => {
    const result = await prisma.barangSubcont.findMany({
        include: {
            subcont: true,
            user: true,
            detail: true,
        }
    });

    return result;
};

const getPaymentType = async () => {
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

const MainPage = async () => {
    const [subcontItems, statuses] = await Promise.all([getItems(), getPaymentType()]);

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li className="text-[#4e73df]">Daftar Barang Subcont</li>
                </ul>
            </div>

            <Content data={subcontItems} styleStatus={statuses} />
        </div>
    );
};

export default MainPage;