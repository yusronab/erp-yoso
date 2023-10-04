import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const divisi = await prisma.divisi.create({
        data: body
    });

    return NextResponse.json(divisi, { status: 201 });
};