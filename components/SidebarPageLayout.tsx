import React from "react";

type SidebarPageLayoutProps = {
  children: React.ReactNode;
};

const SidebarPageLayout: React.FC<SidebarPageLayoutProps> = ({ children }) => {
  return (
    <div className="flex gap-4 p-4 min-h-[calc(100vh-64px)]">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {children && children[0 as keyof typeof children]}
      </div>
      <div className="max-lg:hidden relative min-w-[300px] max-w-[300px] p-2  flex flex-col gap-4">
        {children && children[1 as keyof typeof children]}
      </div>
    </div>
  );
};

export default SidebarPageLayout;
