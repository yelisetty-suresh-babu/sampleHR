import "./../../globals.css";
import { ReactNode } from "react";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { BackgroundBeams } from "@/components/UIComponents/BackgroundBeams";

export default function BookmarksLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        {/* <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full " /> */}

        <AntdRegistry>{children}</AntdRegistry>
      </div>
    </div>
  );
}
