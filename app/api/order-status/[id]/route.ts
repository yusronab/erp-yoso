import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.order.update({
        where: { id: Number(params.id) },
        data: { isStatus: 3 },
    });

    return NextResponse.json(result, { status: 200 });
};