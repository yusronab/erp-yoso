import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);
    const id = session?.user.id;

    // if (!id) return NextResponse.json({ message: 'Invalid user id' }, { status: 401 });

    const body = await request.json();

    // const result = await prisma.company.create({
    //     data: {
    //         ...body,
    //         userId: id
    //     }
    // })

    // if (!result) return NextResponse.json({ message: 'Body is bad' }, { status: 400 });

    return NextResponse.json({
        ...body,
        userId: id
    }, { status: 201 });
};