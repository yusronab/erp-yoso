import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const customer = await prisma.status.create({
        data: body,
    });

    return NextResponse.json(customer, { status: 201 });
};