import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    const result = await prisma.subItem.create({
        data: body
    });

    if (!result) return NextResponse.json({ message: "Error while POST method running" }, { status: 400 })

    return NextResponse.json(result, { status: 201 });
}