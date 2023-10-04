import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();

    const role = await prisma.status.update({
        where: { id: Number(params.id) },
        data: body
    });

    return NextResponse.json(role, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const role = await prisma.status.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date(),
        }
    })

    return NextResponse.json(role, { status: 200 });
};