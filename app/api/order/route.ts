import { generateCode } from "@/utils/helper";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    const result = await prisma.order.create({
        data: {
            ...body,
            paymentStatus: body.paymentMethod === 1 ? 1 : 2,
        }
    });

    if (!result) return NextResponse.json({ message: 'Gagal menambahkan data' }, { status: 400 });

    if (body.customerId) {
        const counter = await prisma.sjso.count();

        const a = new Date();

        const year = a.getFullYear().toString().slice(-2);
        const month = (a.getMonth() + 1).toString().padStart(2, '0');
        const day = a.getDate().toString().padStart(2, '0');

        const formattedDate = 'SJ' + year + month + day;
        const code = generateCode(6, counter + 1, formattedDate);

        const sjso = await prisma.sjso.create({
            data: {
                code: code,
                orderId: result.id,
                tanggalKirim: new Date(),
            }
        });

        if (!sjso) return NextResponse.json({ message: 'Gagal menambahkan surat jalan' }, { status: 400 });
    }

    return NextResponse.json({ message: "Berhasil" }, { status: 201 });
};