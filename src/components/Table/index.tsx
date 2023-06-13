import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}
const MyTable = ({ children }: TableProps) => {
  return (
    <table
      className="bg-white rounded-lg overflow-hidden relative"

    >
      {children}
    </table>
  );
};

export default MyTable;
