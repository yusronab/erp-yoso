import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import type { User } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: User = await request.json();
    
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const isExist = await prisma.user.findUnique({ where: { email: body.email ?? undefined } })

        if (isExist) throw new Error('Email telah digunakan');

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                roleId: body.roleId,
                statusId: 1
            }
        })

        return NextResponse.json(user);

    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400, statusText: "Bad Request" });
    }
}