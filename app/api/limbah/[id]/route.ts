import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { amount, desc } = await request.json();

    const result = await prisma.limbah.update({
        where: { id: Number(params.id) },
        data: {
            amount: Number(amount),
            total: Number(amount),
            desc: desc,
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