import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();

    const subcont = await prisma.subcont.update({
        where: { id: Number(params.id) },
        data: {
            ...body,
            name: body.name.toUpperCase()
        }
    })

    return NextResponse.json(subcont, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const subcont = await prisma.subcont.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(subcont, { status: 200 });
};