import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth"

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  return redirect('/dashboard');
}