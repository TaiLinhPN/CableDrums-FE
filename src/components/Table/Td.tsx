import { ReactNode } from "react";

interface TdProps {
  children: ReactNode;
  style?: string;
}

const Td = ({ children, style }: TdProps) => {
  return (
    <td className="px-3 py-2 whitespace-nowrap text-center">
      <div className={`text-sm text-royal-brown  ${style? style: "" }`}>
        {children}
      </div>
    </td>
  );
};

export default Td