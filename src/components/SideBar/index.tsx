import { ReactNode } from "react";

interface SideBarProps {
  children: ReactNode;
}
const SideBar = ({ children }: SideBarProps) => {
  return (
    <aside className=" w-64 text-silver bg-[url('../../../hinhnen.jpg')] bg-[center_top] relative">
      <div className=" bg-royal-brown opacity-80 h-full">{children}</div>
    </aside>
  );
};

export default SideBar;
