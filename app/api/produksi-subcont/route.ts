import { DetailBarangSubcont } from "@/types";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    
    const createData = await prisma.barangSubcont.create({
        data: {
            code: body.code,
            total: body.total,
            tempo: body.tempo,
            userId: body.userId,
            subcontId: body.subcontId,
            paymentMethod: body.paymentMethod,
            paymentStatus: body.paymentMethod === 1 ? 1 : 2,
        }
    });

    if (!createData) return NextResponse.json({ message: "Gagal membuat barang subcont" }, { status: 400 });

    const insertDetailId = body.detail.map((item: DetailBarangSubcont) => ({
        ...item,
        barangSubcontId: createData.id,
    }));
    
    const result = await prisma.barangSubcontDetail.createMany({
        data: insertDetailId,
    })

    if(!result) return NextResponse.json({ message: "Gagal membuat data detail" }, { status: 400 });

    return NextResponse.json(result, { status: 201 });
};