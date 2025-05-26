import "./globals.css";
import { ReactNode } from "react";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/components/ThemeComponents/ThemeProvider";
// import { BackgroundBeams } from "@/components/UIComponents/BackgroundBeams";
import CustomErrorBoundary from "@/components/CustomErrorBoundary";

export const metadata = {
  title: "Sample HR Website",
  description: "Context API with Next.js App Router",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomErrorBoundary>
          {/* <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full " /> */}

          <AntdRegistry>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AntdRegistry>
        </CustomErrorBoundary>
      </body>
    </html>
  );
}
