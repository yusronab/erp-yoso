import Link from "next/link";
import { MdFindInPage } from "react-icons/md";

const Page = () => {
    return (
        <div className="h-full w-full flex flex-col gap-5 justify-center items-center">
            <MdFindInPage size={32} color="#4e73df" />
            <p className="font-bold text-2xl text-[#4e73df]">
                Halaman tidak ditemukan!
            </p>
            <Link href="/" className="hover:underline hover:text-[#4e73df] transition-all duration-200">
                kembali
            </Link>
        </div>
    );
};

export default Page;