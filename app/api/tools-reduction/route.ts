import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const { name, amount, desc, toolsId, stock } = await request.json();

    const tools = await prisma.tools.findUnique({ where: { id: Number(toolsId) } });

    if (!tools) return NextResponse.json({ message: 'Invalid tools id' }, { status: 422 })

    const reduceStock = tools.amount - Number(amount);
    
    const updateStock = await prisma.tools.update({
        data: { amount: reduceStock },
        where: { id: Number(tools.id) }
    });

    if (!updateStock) return NextResponse.json({ message: 'Failed updating tools stock' }, { status: 422 })

    const result = await prisma.toolsReduction.create({
        data: {
            name: name,
            amount: Number(amount),
            desc: desc,
            toolsId: Number(toolsId)
        },
    });

    if (!result) return NextResponse.json({ message: 'Error during create process' }, { status: 400 })

    return NextResponse.json(result, { status: 201 });
};