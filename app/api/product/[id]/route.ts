import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { name, price, productType, formulaId } = await request.json();

    if (productType === 1) {
        const formula = await prisma.formulaItem.update({
            data: {
                name: name,
                price: price,
            },
            where: { id: formulaId },
        });

        if(!formula) return NextResponse.json({ message: 'Gagal update formula item' }, { status: 422 })
    }

    if (productType === 2) {
        const formula = await prisma.formulaUtama.update({
            data: {
                name: name,
                price: price,
            },
            where: { id: formulaId },
        });

        if(!formula) return NextResponse.json({ message: 'Gagal update formula utama' }, { status: 422 })
    }

    const result = await prisma.product.update({
        where: { id: Number(params.id) },
        data: {
            name: name,
            price: price,
            productType: productType,
        },
    })

    return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.product.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(result, { status: 200 });
};