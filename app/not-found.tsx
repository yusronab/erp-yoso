import Link from "next/link";
import { RiForbid2Line } from "react-icons/ri";

const Page = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#24344c]">
            <h1 className="text-center text-white text-[100px] font-extrabold mb-0">
                4<RiForbid2Line className="animate-bounce" />4
            </h1>
            <p className="text-white mb-6">Halaman tidak ditemukan!</p>
            <Link href="/dashboard" className="btn btn-outline btn-warning lowercase">
                kembali
            </Link>
        </div>
    );
};

export default Page;