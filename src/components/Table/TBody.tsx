
import { ReactNode } from "react";

interface TBodyProps {
  children: ReactNode;
}
const TBody = ({ children }: TBodyProps) => {
    return (
      <tbody className="bg-white divide-y divide-gray-200 min-w-full">
        {children}
      </tbody>
    );
};

export default TBody