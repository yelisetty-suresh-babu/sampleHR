import React from "react";
import DisplayUsers from "../components/HomePageComponents/DisplayUsers";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col gap-y-4 items-center justify-center">
      {/* <Particles /> */}
      <DisplayUsers />
    </main>
  );
}
