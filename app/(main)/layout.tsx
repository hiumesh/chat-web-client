import DashboardNavbar from "@/components/DashboardNavbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="h-screen flex">
          <DashboardNavbar />
          <div className="flex-1">{children}</div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
