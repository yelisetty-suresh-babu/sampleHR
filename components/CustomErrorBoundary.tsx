"use client";
import { ReactNode } from "react";
import { Button, Empty } from "antd";
import { ErrorBoundary } from "react-error-boundary";

import useWindowSize from "../hooks/useWindowSize";
import { usePathname, useRouter } from "next/navigation";
import { BackgroundBeams } from "./UIComponents/BackgroundBeams";

interface ErrorBoundaryProps {
  children: ReactNode;
  message?: string;
}

const CustomErrorBoundary = ({ children, message }: ErrorBoundaryProps) => {
  const [, height] = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        return (
          <div
            className="flex flex-col w-full items-center justify-center gap-y-4"
            style={{ height: height - 110 }}
          >
            <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full " />
            <Empty description={false} />
            <p className="ant-upload-hint text-gray-500">
              {message || "Something went wrong!"}
            </p>
            <p className="text-red-500 text-md font-bold">{error.message}</p>
            <Button
              onClick={() => {
                router.replace("/");
                resetErrorBoundary();
              }}
            >
              Back Home
            </Button>
          </div>
        );
      }}
      resetKeys={[pathname]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
