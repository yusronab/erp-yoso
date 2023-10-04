import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const { name, number, qty } = await request.json();

    const result = await prisma.barangSetengahJadi.create({
        data: {
            name: name,
            number: number,
            qty: qty,
        },
    });

    return NextResponse.json(result, { status: 201 });
};