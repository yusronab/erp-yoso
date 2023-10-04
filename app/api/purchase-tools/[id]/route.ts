import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { tenor } = await request.json();

    const current = await prisma.purchaseTools.findUnique({
        where: { id: Number(params.id) },
    });
    
    if (!current) return NextResponse.json({ message: 'Invalid purchase id' }, { status: 400 });

    const updateTenor = Number(current.tenor) + Number(tenor);

    if (Number(current.total) === updateTenor) {
        const result = await prisma.purchaseTools.update({
            where: { id: Number(params.id) },
            data: {
                tenor: updateTenor,
                paymentStatus: 1,
            },
        });
    
        return NextResponse.json(result, { status: 200 });
    }
    
    const result = await prisma.purchaseTools.update({
        where: { id: Number(params.id) },
        data: { tenor: updateTenor },
    });

    return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.purchaseTools.update({
        where: { id: Number(params.id) },
        data: { isStatus: 2 },
    });

    return NextResponse.json(result, { status: 200 });
};