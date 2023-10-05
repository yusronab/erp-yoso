import { generateCode } from "@/utils/helper";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    const counter = await prisma.material.count();

    const customCode = generateCode(6, counter + 1, 'MTYM');

    const res = await prisma.material.createMany({
        data: {
            ...body,
            code: customCode
        }
    });

    return NextResponse.json(res, { status: 201 });
}