import { generateCode } from "@/utils/helper";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const { name, amount, desc } = await request.json();

    const dataCount = await prisma.tools.count();
    
    const result = await prisma.tools.create({
        data: {
            code: generateCode(3, dataCount, 'tlsys'),
            name: name,
            amount: amount,
            desc: desc,
        },
    });

    if (!result) return NextResponse.json({ message: 'Error during create process' }, { status: 400 })

    return NextResponse.json(result, { status: 201 });
};