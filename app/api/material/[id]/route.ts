import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();

    const material = await prisma.material.update({
        where: { id: Number(params.id) },
        data: body
    })

    return NextResponse.json(material, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const material = await prisma.material.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(material, { status: 200 });
};