import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const countModule = await prisma.status.count({
        where: { module: body.module }
    })

    const customer = await prisma.status.create({
        data: {
            ...body,
            fkey: countModule + 1
        },
    });

    return NextResponse.json(customer, { status: 201 });
};