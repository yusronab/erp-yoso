import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from "next-auth";
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            authorize: async (credential) => {
                if (!credential?.email || !credential?.password) {
                    throw new Error("Invalid email or password");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credential.email },
                    include: {
                        role: true,
                        status: true,
                    }
                });

                if (!user || !user?.password) {
                    throw new Error("Email tidak cocok dengan User manapun");
                }

                const isCorrect = await bcrypt.compare(credential.password, user.password)
                if (!isCorrect) {
                    throw new Error("Password salah euy")
                }

                return {
                    ...user,
                    id: user.id.toString(),
                    role: user.role.name,
                    status: user.status.name,
                };
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user, session, trigger, account }) => {
            if (trigger === 'update' && session?.name) {
                token.name = session.name;
            }

            if (user) {
                const userRelation = await prisma.user.findUnique({
                    where: { id: Number(user.id) },
                    include: {
                        role: true,
                        status: true,
                    }
                });

                if (!userRelation) {
                    throw new Error("User not found");
                }

                return {
                    ...token,
                    id: user.id,
                    role: userRelation.role.name,
                    status: userRelation.status.name,
                };
            }

            if (token.name !== null && token.name !== undefined) {
                await prisma.user.update({
                    where: { id: Number(token.id) },
                    data: { name: token.name }
                });
            }

            return token;
        },
        session: async ({ session, token, user }) => {
            const newSession = {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    role: token.role,
                    status: token.status,
                }
            }

            return newSession;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    debug: true,
    session: { strategy: "jwt" },
    secret: "rahasia"
}