import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { name, amount, desc } = await request.json();

    const result = await prisma.tools.update({
        where: { id: Number(params.id) },
        data: {
            name: name,
            amount: amount,
            desc: desc,
        },
    });

    if (!result) return NextResponse.json({ message: 'Error during update process' }, { status: 400 })

    return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.tools.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(result, { status: 200 });
};