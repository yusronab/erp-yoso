import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();

    const divisi = await prisma.divisi.update({
        where: { id: Number(params.id) },
        data: {
            name: body.name
        }
    })

    return NextResponse.json(divisi, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const divisi = await prisma.divisi.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(divisi, { status: 200 });
};