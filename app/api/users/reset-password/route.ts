import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request) => {
    const body = await request.json();

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);

    const user = await prisma.user.update({
        where: { id: Number(body.id) },
        data: { password: hashedPassword }
    })

    if (!user) return NextResponse.json({ message: 'Update query gagal dijalankan' }, { status: 422 })

    return NextResponse.json({message: "Proses update password berhasil"}, { status: 200 });
}