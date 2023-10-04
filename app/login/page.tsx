import FormLogin from "@/components/FormLogin"
import { getServerSession } from "next-auth";
import Image from "next/image"
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export const metadata = {
    title: "Yoso Meka | Login",
}

const Login = async () => {
    const session = await getServerSession(authOptions);

    if (session) redirect('/dashboard');

    return (
        <div className="flex w-screen flex-col items-center gap-32 p-10 md:p-20 md:h-screen md:items-center
        md:flex-row">
            <div className="flex">
                <Image
                    src="/image-login.svg"
                    alt=""
                    width={500}
                    height={500}
                    className="object-contain"
                />
            </div>
            <div className="flex-1">
                <h1 className="text-3xl">Silahkan Masuk</h1>
                <p className="my-4">
                    Pegawai yang terhormat, silahkan masukan email dan password yang anda miliki. apabila
                    belum memiliki akun, dimohon untuk registrasi terlebih dahulu
                </p>
                <FormLogin />
            </div>
        </div>
    )
}

export default Login;