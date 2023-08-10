import SideNavBar from "@/components/SideNavBar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex w-full h-full">
        <SideNavBar className="max-lg:hidden" />
        {children}
      </div>
    </>
  );
}
