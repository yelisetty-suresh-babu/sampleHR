import "./../globals.css";
import { ReactNode } from "react";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function BookmarksLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
