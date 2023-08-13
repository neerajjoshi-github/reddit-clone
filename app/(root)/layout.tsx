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
      <div className="flex justify-center">
        <div className="flex w-[1350px] max-w-[1350px]">
          <SideNavBar className="sticky top-[64px] right-0 max-xl:hidden" />
          <div className="pt-[64px] w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
