import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { amount, price, desc } = await request.json();

    const result = await prisma.limbahJual.update({
        where: { id: Number(params.id) },
        data: {
            amount: amount,
            price: price,
            desc: desc,
        },
    })

    return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.limbahJual.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(result, { status: 200 });
};