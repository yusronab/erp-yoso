import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const subcont = await prisma.subcont.create({
        data: body
    });

    return NextResponse.json(subcont, { status: 201 });
};