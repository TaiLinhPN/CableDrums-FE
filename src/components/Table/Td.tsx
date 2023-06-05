import { ReactNode } from "react";

interface TdProps {
  children: ReactNode;
}

const Td = ({ children }: TdProps) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-center">
      <div className="text-sm text-gray-900">{children}</div>
    </td>
  );
};

export default Td