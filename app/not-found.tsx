import Link from "next/link";
import { MdFindInPage } from "react-icons/md";

const Page = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#24344c]">
            <h1 className="text-center text-white text-[100px] font-extrabold mb-0">404</h1>
            <p className="text-white mb-6"><MdFindInPage /> Halaman tidak ditemukan!</p>
            <Link href="/" className="btn btn-outline btn-warning lowercase">
                kembali
            </Link>
        </div>
    );
};

export default Page;