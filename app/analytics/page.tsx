// AnalyticsPage.tsx
"use client";
import CustomSpinner from "@/components/HomePageComponents/CustomSpinner";
import { useDataStore } from "@/store/useDataStore";
import React, { Suspense, useEffect, useState } from "react";
import { Button, Tabs, TabsProps } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import DepartmentWiseRatingsChart from "@/components/AnalyticsPageComponents/DepartmentWiseRatingsChart";
import BookmarksTrendsChart from "@/components/AnalyticsPageComponents/BookmarksTrendsChart";
import { ModeToggle } from "@/components/ThemeComponents/ThemeToggleButton";

const AnalyticsPageDuplicate = () => {
  const [width, height] = useWindowSize();
  const { users, loading } = useDataStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "departmentRatings";
  const [activeKey, setActiveKey] = useState(currentTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") || "departmentRatings";
    setActiveKey(tabFromUrl);
  }, [searchParams]);

  if (loading) return <CustomSpinner />;

  const items: TabsProps["items"] = [
    {
      key: "departmentRatings",
      label: "Department Ratings",
      children: (
        <DepartmentWiseRatingsChart
          key={1}
          values={(() => {
            const totals =
              users?.reduce<{
                [department: string]: { sum: number; count: number };
              }>((map, user) => {
                const dept = user.company.department;
                if (!map[dept]) {
                  map[dept] = { sum: user.rating, count: 1 };
                } else {
                  map[dept].sum += user.rating;
                  map[dept].count += 1;
                }
                return map;
              }, {}) || {};

            const averages: Record<string, number> = {};
            for (const dept in totals) {
              averages[dept] = totals[dept].sum / totals[dept].count;
            }

            return averages;
          })()}
        />
      ),
    },
    {
      key: "bookmarkTrends",
      label: "Bookmark Trends",
      children: <BookmarksTrendsChart key={2} />,
    },
  ];

  const onChange = (key: string) => {
    console.log("Tab changed to:", key);
    setActiveKey(key);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("tab", key);
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${window.location.pathname}${query}`);
  };

  return (
    <React.Fragment>
      <Button
        className="absolute right-0 top-0 mt-4 ml-4 z-10"
        onClick={() => router.back()}
      >
        <ArrowLeftOutlined />
      </Button>
      <ModeToggle />

      <div
        className="flex items-center justify-center p-4"
        style={{
          width: width,
          height: height,
        }}
      >
        <div className="w-full h-full max-w-7xl">
          <h1 className="text-4xl font-bold">Analytics</h1>

          <Tabs
            activeKey={activeKey}
            items={items}
            onChange={onChange}
            size="large"
            className="custom-tabs h-full"
            tabBarGutter={50}
            centered
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const AnalyticsPage = () => {
  return (
    <Suspense>
      <AnalyticsPageDuplicate />;
    </Suspense>
  );
};

export default AnalyticsPage;
