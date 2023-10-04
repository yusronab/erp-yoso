import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const { amount, price, desc } = await request.json();
    
    const result = await prisma.limbahJual.create({
        data: {
            amount: amount,
            price: price,
            desc: desc,
        },
    });

    return NextResponse.json(result, { status: 201 });
};