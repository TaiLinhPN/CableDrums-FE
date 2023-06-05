import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}
const MyTable = ({ children }: TableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      {children}
    </table>
  );
};

export default MyTable;
