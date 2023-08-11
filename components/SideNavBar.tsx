import Link from "next/link";
import { FC } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { BsArrowUpRightCircle, BsMegaphone } from "react-icons/bs";
import { links } from "@/lib/constants/sideNavBarLinks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PiRedditLogo } from "react-icons/pi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { cn } from "@/lib/utils";

interface SideNavBarProps {
  className?: string;
}

const SideNavBar: FC<SideNavBarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        `fixed top-0 left-0 bg-background min-w-[250px] max-w-[250px] h-full border-r border-gray-700 pt-20 pb-4 pl-12 pr-2 overflow-y-auto hidden-scrollbar`,
        className
      )}
    >
      <div className="flex flex-col gap-8 border-b border-gray-700 py-8 px-1">
        <Link
          href="/"
          className="flex items-center gap-4 text-mutedText hover:text-whitesmoke transition duration-300"
        >
          <LiaHomeSolid size={28} />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          href="/"
          className="flex gap-4 items-start text-mutedText hover:text-whitesmoke transition duration-300"
        >
          <BsArrowUpRightCircle size={24} />
          <span className="text-sm">Popular</span>
        </Link>
      </div>

      <div className="border-b border-gray-700 py-6 text-mutedText">
        <h4 className="text-mutedText text-xs font-semibold my-1">TOPICS</h4>
        <div className="flex flex-col gap-6 px-1 mt-4 text-sm">
          {links.map((link) => {
            return (
              <Accordion key={link.id} type="single" collapsible>
                <AccordionItem value={`Item-${link.id}`}>
                  <AccordionTrigger className="py-0 !no-underline">
                    <div className="flex gap-4">
                      <link.icon size={24} />
                      <p>{link.title}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-8 py-6 pl-10">
                      {link.children.map((childLink) => {
                        return (
                          <Link href={childLink.href} key={childLink.title}>
                            {childLink.title}
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>

      <div className="py-6 text-mutedText">
        <h4 className="text-mutedText text-xs font-semibold my-1">RESOURCES</h4>
        <div className="flex flex-col gap-6 px-1 mt-4 text-sm">
          <Link href="/">
            <div className="flex gap-4 items-center">
              <PiRedditLogo size={24} />
              <p>About Reddit</p>
            </div>
          </Link>
          <Link href="/">
            <div className="flex gap-4 items-center">
              <IoMdHelpCircleOutline size={24} />
              <p>About Reddit</p>
            </div>
          </Link>
          <Link href="/">
            <div className="flex gap-4 items-center">
              <BsMegaphone size={24} />
              <p>About Reddit</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
