import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { name, number, qty } = await request.json();

    const result = await prisma.barangJadi.update({
        where: { id: Number(params.id) },
        data: {
            name: name,
            number: number,
            qty: qty,
        },
    })

    return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.barangJadi.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(result, { status: 200 });
};