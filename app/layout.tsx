import "./globals.css";
import { ReactNode } from "react";
import { DataProvider } from "../context/DataContext";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata = {
  title: "Sample HR Website",
  description: "Context API with Next.js App Router",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </DataProvider>
      </body>
    </html>
  );
}
