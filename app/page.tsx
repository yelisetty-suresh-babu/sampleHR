import React from "react";
import DisplayUsers from "../components/homePageComponents/DisplayUsers";
import { Particles } from "@/components/magicui/particles";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col gap-y-4 items-center justify-center">
      {/* <Particles /> */}
      <DisplayUsers />
    </main>
  );
}
