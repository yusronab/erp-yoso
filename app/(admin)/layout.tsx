import Heading from "@/components/Heading";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex">
            <Sidebar />
            <div className="flex-1 overflow-x-auto">
                <Heading />
                {children}
            </div>
        </section>
    );
}