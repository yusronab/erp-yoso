import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const ukuran = await prisma.ukuran.create({
        data: body
    });

    return NextResponse.json(ukuran, { status: 201 });
};