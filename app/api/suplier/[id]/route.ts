import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();

    const suplier = await prisma.suplier.update({
        where: { id: Number(params.id) },
        data: body
    })

    return NextResponse.json(suplier, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const suplier = await prisma.suplier.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(suplier, { status: 200 });
};