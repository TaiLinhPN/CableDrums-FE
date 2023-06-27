import { Skeleton } from "antd";

interface LoadingProps {
  isLoading: boolean;
  dataLength: number;
  text: string;
}

const Loading = ({ isLoading, dataLength, text }: LoadingProps) => {
  return (
    <>
      {isLoading && (
        <div className="min-w-full mt-8 space-y-6">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}

      {!isLoading && dataLength === 0 && (
        <div className="min-w-full mt-8 text-center">{text}</div>
      )}
    </>
  );
};

export default Loading;
