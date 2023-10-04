import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// VIEW ROUTE PELUNASAN SO
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { tenor } = await request.json();

    const current = await prisma.order.findUnique({
        where: { id: Number(params.id) },
    });

    if (!current) return NextResponse.json({ message: 'Invalid order id' }, { status: 400 });

    const updateTenor = Number(current.tenor) + Number(tenor);

    if (Number(current.total) === updateTenor) {
        const result = await prisma.order.update({
            where: { id: Number(params.id) },
            data: {
                tenor: updateTenor,
                paymentStatus: 1,
            },
        });

        return NextResponse.json(result, { status: 200 });
    }

    const result = await prisma.order.update({
        where: { id: Number(params.id) },
        data: { tenor: updateTenor },
    });

    return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.order.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(result, { status: 200 });
};