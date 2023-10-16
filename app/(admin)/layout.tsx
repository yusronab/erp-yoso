import Heading from "@/components/Heading"
import Sidebar from "@/components/Sidebar"
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <section className="flex">
            <Sidebar isMobileSidebarOpen={isMobileSidebarOpen} />
            <div className="flex-1">
                <Heading toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
                {children}
            </div>
        </section>
    );
}