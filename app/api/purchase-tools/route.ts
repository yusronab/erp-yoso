import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    const result = await prisma.purchaseTools.create({
        data: {
            ...body,
            paymentStatus: body.paymentMethod === 1 ? 1 : 2,
        },
    });

    if (!result) return NextResponse.json({ message: 'Gagal membuat pembelian baru' }, { status: 400 });

    return NextResponse.json(result, { status: 201 });
};