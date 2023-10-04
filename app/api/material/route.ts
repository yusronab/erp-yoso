import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    const getData = await prisma.material.count();

    const customCode = getData.toString().length == 3 ? getData.toString() : getData.toString().length == 2 ? "0" + getData.toString() : "00" + getData.toString()

    const res = await prisma.material.createMany({ data: body });

    return NextResponse.json(res, { status: 201 });
}