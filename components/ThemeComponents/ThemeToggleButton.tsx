"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { FloatButton } from "antd";

import {
  BookOutlined,
  LineChartOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
      <FloatButton
        onClick={toggleTheme}
        icon={theme === "dark" ? <MoonOutlined /> : <SunOutlined />}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </FloatButton>
      <FloatButton
        icon={<BookOutlined />}
        onClick={() => router.push("/bookmarks")}
        tooltip={{ title: "Bookmarks", placement: "left" }}
      />
      <FloatButton
        icon={<LineChartOutlined />}
        onClick={() => router.push("/analytics")}
        tooltip={{ title: "Analytics", placement: "left" }}
      />
    </FloatButton.Group>
  );
}
