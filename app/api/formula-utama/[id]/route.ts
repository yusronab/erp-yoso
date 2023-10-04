import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const dataFormula = await prisma.formulaUtama.findUnique({
        where: { id: Number(params.id) },
        include: { subItem: true },
    })

    if (!dataFormula) return NextResponse.json({ message: "Invalid formula id" });

    const list = await prisma.formulaItem.findMany({
        include: { subItem: true },
    })

    if (!list) return NextResponse.json({ message: "Error while fetching divisi" });

    const filteredData = list.filter(item => item.subItem.some(
        formula => formula.formulaUtamaId === Number(params.id)
    ));

    const result = {
        name: dataFormula.name,
        formulaProduksi: filteredData,
    }

    return NextResponse.json(result, { status: 200 })
}

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();

    const result = await prisma.formulaUtama.update({
        where: { id: Number(params.id) },
        data: body
    })

    return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const result = await prisma.formulaUtama.update({
        where: { id: Number(params.id) },
        data: {
            deletedAt: new Date()
        }
    })

    return NextResponse.json(result, { status: 200 });
};