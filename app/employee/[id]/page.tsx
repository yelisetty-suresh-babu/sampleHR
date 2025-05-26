"use client";

import UserPageHeader from "@/components/UserPageComponents/UserPageHeader";
import UserPageTabs from "@/components/UserPageComponents/UserPageTabs/UserPageTabs";
import { useDataStore } from "@/store/useDataStore";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ModeToggle } from "@/components/ThemeComponents/ThemeToggleButton";

const Employeepage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { getUser } = useDataStore();
  const user = getUser(Number(id as string));

  return (
    <React.Fragment>
      <Button
        className="absolute right-0 top-0 mt-4 ml-4"
        onClick={() => router.back()}
      >
        <ArrowLeftOutlined />
      </Button>
      <div className="flex gap-y-6 flex-col items-center ">
        <ModeToggle />

        <UserPageHeader user={user} />
        <UserPageTabs user={user} />
      </div>
    </React.Fragment>
  );
};

export default Employeepage;
