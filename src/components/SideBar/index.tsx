import { ReactNode } from "react";

interface SideBarProps {
  children: ReactNode;
}
const SideBar = ({ children }: SideBarProps) => {
  return (
    <aside className="bg-gray-200 w-64  ">
      <div>{children}</div>
    </aside>
  );
};

export default SideBar;
