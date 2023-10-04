import { generateCode } from "@/utils/helper";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    if (body.productType === '1') {
        const formula = await prisma.formulaItem.create({
            data: {
                name: body.name,
                price: Number(body.price),
            }
        });

        body.formulaId = formula.id;
    }

    if (body.productType === '2') {
        const formula = await prisma.formulaUtama.create({
            data: {
                name: body.name,
                price: Number(body.price),
            }
        });

        body.formulaId = formula.id;
    }

    const count = await prisma.product.count();

    const product = await prisma.product.create({
        data: {
            code: generateCode(5, count, 'pym-itm'),
            name: body.name,
            price: Number(body.price),
            formulaId: body.formulaId,
            productType: Number(body.productType),
            satuanId: Number(body.satuanId),
        }
    })

    if (!product) return NextResponse.json({ message: 'Failed create new product' }, { status: 400 })

    if (body.isDiscount) {
        await prisma.discount.create({
            data: {
                name: body.discountName,
                minOrder: Number(body.minOrder),
                value: Number(body.value),
                typeValue: Number(body.typeValue),
                desc: body.discountName,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                isActive: 1,
                productId: product.id,
            }
        })

        console.log('discount success');
    }

    return NextResponse.json(product, { status: 201 })
};