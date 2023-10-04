import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    const result = await prisma.formulaProduksi.create({
        data: body
    });

    return NextResponse.json(result, { status: 201 });
}