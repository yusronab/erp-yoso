import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const GET = async () => {
    const role = await prisma.role.findMany({
        orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(role, { status: 200 })
}

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const customer = await prisma.role.create({
        data: {
            ...body,
            code: body.code.toUpperCase(),
            name: body.name.toUpperCase(),
        },
    });

    return NextResponse.json(customer, { status: 201 });
};