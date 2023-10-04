import Form from "./form";
import prisma from "../../../lib/prisma";

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

const CreatePage = async () => {
    const listUkuran = await getUkuran();

    return (
        <div className="flex justify-center items-center">
            <div className="card card-compact bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="card-title">Tambah Produk</div>
                    {listUkuran && <Form satuanUkuran={listUkuran} />}
                </div>
            </div>
        </div>
    );
};

export default CreatePage;