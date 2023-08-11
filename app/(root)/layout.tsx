import SideNavBar from "@/components/SideNavBar";
import Navbar from "@/components/Navbar";
import CommunitiesMenu from "@/components/CommunitiesMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SideNavBar className="max-lg:hidden" />

      {children}
      <CommunitiesMenu />
    </>
  );
}
