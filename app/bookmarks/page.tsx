"use client";
import CustomSpinner from "./../../components/HomePageComponents/CustomSpinner.tsx";
import EmptyUsers from "./../../components/HomePageComponents/EmptyUsers.tsx";
import UserCard from "./../../components/HomePageComponents/UserCard.tsx";
import { useDataStore } from "@/store/useDataStore";

import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ThemeComponents/ThemeToggleButton";

const Bookmarkspage = () => {
  const { loading, getBookmarkedUsers } = useDataStore();
  const router = useRouter();
  const bookmarked = getBookmarkedUsers();

  console.log("users", bookmarked);
  if (loading) return <CustomSpinner />;

  return (
    <React.Fragment>
      <Button
        className="absolute right-0 top-0 mt-4 ml-4"
        onClick={() => router.back()}
      >
        <ArrowLeftOutlined />
      </Button>
      <ModeToggle />

      <div className="w-full flex flex-col items-center  p-4  min-h-screen">
        <div className="w-full max-w-7xl flex flex-col gap-6 z-10">
          <h1 className="text-4xl font-bold">Bookmarked Users</h1>
          {bookmarked?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {bookmarked
                ?.filter((user) => user.isBookmarked)
                .map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
            </div>
          ) : (
            <div>
              <EmptyUsers message="Try Bookmarking Users from Home Page" />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Bookmarkspage;
