"use client";

import { User } from "@/interfaces/UserInterface";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "../homePageComponents/StarRating";

interface UserPageHeaderProps {
  user: User | null;
}

const UserPageHeader = ({ user }: UserPageHeaderProps) => {
  const [mounted, setMounted] = useState(false);

  // Ensure consistent hydration by waiting until client mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return null; // Optionally show a spinner or skeleton
  }

  return (
    <div className="flex flex-col sm:flex-row gap-x-6 gap-y-6 items-center justify-center">
      <Image
        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
        alt={`${user.firstName} ${user.lastName}`}
        width={300}
        height={300}
        className="w-[300px] h-[300px] rounded-full object-cover ring-2 ring-blue-100"
      />

      <div className="flex items-center sm:items-start flex-col gap-y-6">
        <h1 className="text-2xl sm:text-4xl font-bold">
          {user.firstName} {user.lastName}
        </h1>
        <div className="flex items-center sm:items-start flex-col gap-y-2">
          <h2 className="text-xl font-bold">{user.email}</h2>
          <h2 className="text-xl font-bold">{user.phone}</h2>
          <StarRating rating={user.rating} />
        </div>
      </div>
    </div>
  );
};

export default UserPageHeader;
