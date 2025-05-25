"use client";

import React from "react";
import { Tabs, TabsProps } from "antd";
import { User } from "@/interfaces/UserInterface";

import UserPageTabComponent from "./UserPageTabComponent";

interface UserPageTabsProps {
  user: User;
}

const onChange = (key: string) => {
  console.log(key);
};

const UserPageTabs = ({}: UserPageTabsProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <UserPageTabComponent key={1} message="Overview" />,
    },
    {
      key: "2",
      label: "Projects",
      children: <UserPageTabComponent key={2} message="Projects" />,
    },
    {
      key: "3",
      label: "Feedback",
      children: <UserPageTabComponent key={3} message="Feedback"/>,
    },
  ];

  return (
    <div className="custom-tabs-wrapper">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        size="large"
        className="custom-tabs"
        tabBarGutter={150}
        centered
      />
    </div>
  );
};

export default UserPageTabs;
