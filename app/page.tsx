import React from "react";
import DisplayUsers from "../components/DisplayUsers";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-6xl font-bold">Title</h1>
      <DisplayUsers />
    </main>
  );
}
