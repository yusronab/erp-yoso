import TableCreate from "./table";
import prisma from "../../../lib/prisma";

const getUkuran = async () => {
    const res = await prisma.ukuran.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    return res;
}

const getSuplier = async () => {
    const res = await prisma.suplier.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    return res;
}

const MaterialCreate = async () => {
    const [ukuran, suplier] = await Promise.all([getUkuran(), getSuplier()]);
    
    return (
        <div className="p-5">
            <TableCreate
                ukuran={ukuran}
                suplier={suplier}
            />
        </div>
    )
}

export default MaterialCreate;