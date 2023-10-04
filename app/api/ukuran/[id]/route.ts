import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();

    const ukuran = await prisma.ukuran.update({
        where: { id: Number(params.id) },
        data: {
            name: body.name
        }
    })

    return NextResponse.json(ukuran, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const ukuran = await prisma.ukuran.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(ukuran, { status: 200 });
};