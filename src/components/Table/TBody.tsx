import { ReactNode } from "react";

interface TBodyProps {
  children: ReactNode;
}
const TBody = ({ children }: TBodyProps) => {
  return (
    <tbody className="bg-white divide-y  divide-gray-300 ">{children}</tbody>
  );
};

export default TBody;
