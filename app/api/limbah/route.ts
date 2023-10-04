import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const { amount, desc } = await request.json();
    
    const result = await prisma.limbah.create({
        data: {
            amount: Number(amount),
            total: Number(amount),
            desc: desc,
        },
    });

    return NextResponse.json(result, { status: 201 });
};