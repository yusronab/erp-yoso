import { Inter } from "next/font/google";
import { FormProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <FormProvider>{children}</FormProvider>
}