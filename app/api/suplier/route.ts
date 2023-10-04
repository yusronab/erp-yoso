import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const suplier = await prisma.suplier.create({
        data: body
    });

    return NextResponse.json(suplier, { status: 201 });
};