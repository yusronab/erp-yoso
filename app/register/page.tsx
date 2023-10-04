import FormRegister from "@/components/FormRegister"
import { PrismaClient } from "@prisma/client"
import Image from "next/image"

export const metadata = {
  title: "Yoso Meka | Register",
}

const prisma = new PrismaClient();

const getRoles = async () => {
  const res = await prisma.role.findMany();

  return res;
}

const Register = async () => {
  const roles = await getRoles();
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
        <h1 className="text-3xl">Buat Akun Baru</h1>
        <p className="my-4">
          Mohon masukan data lengkap dengan cara mengisi form inputan yang ada
        </p>
        <FormRegister roles={roles} />
      </div>
    </div>
  )
}

export default Register;