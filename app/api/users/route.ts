import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export const GET = async () => {
    const user = await prisma.user.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
            role: true,
            status: true,
        }
    });

    return NextResponse.json(user, { status: 200 })
}

export const POST = async (request: Request) => {
    const body = await request.json();

    const getUser = await prisma.user.findUnique({
        where: { id: Number(body.id) }
    })
    
    if (!getUser) return NextResponse.json({ message: 'User id tidak ditemukan' }, { status: 401 })

    const comparePassword = await bcrypt.compare(body.password, getUser.password);
    
    if (!comparePassword) return NextResponse.json({ message: 'Password tidak cocok' }, { status: 400 })

    return NextResponse.json(getUser, { status: 200, });
};