"use client";
import React from "react";
import { useDataStore } from "../../store/useDataStore"; // Changed import
import { useUserFiltering } from "../../hooks/useUserFiltering";
import { Input, Select, Button, Spin } from "antd";
import { SearchProps } from "antd/es/input";

// import { BackgroundBeams } from "../UIComponents/BackgroundBeams";

import EmptyUsers from "./EmptyUsers";
import UserCard from "./UserCard";
import { useTheme } from "next-themes";
import { LoadingOutlined } from "@ant-design/icons";
import useWindowSize from "@/hooks/useWindowSize";

const { Search } = Input;
const { Option } = Select;

const DisplayUsers = () => {
  const { users, loading } = useDataStore();
  const { theme } = useTheme();
  console.log("theme", theme);
  const [, height] = useWindowSize();

  const {
    searchValue,
    selectedDepartments,
    selectedRatings,
    setSearchValue,
    setSelectedDepartments,
    setSelectedRatings,
    departmentOptions,
    ratingOptions,
    filteredUsers,
    resetFilters,
  } = useUserFiltering(users);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading)
    return (
      <div
        className=" h-screen flex items-center justify-center"
        style={{
          height: height - 100,
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center  p-4  min-h-screen">
      {/* <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full " /> */}
      <div className="w-full max-w-7xl flex flex-col gap-6 z-10">
        <div className="text-center mb-4">
          <h1
            className={`text-6xl font-bold text-gray-900 mb-2 ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            Team Directory
          </h1>
          <p
            className={`text-gray-600 mb-4 text-xl
          
          ${theme === "dark" ? "text-white" : ""}
          `}
          >
            Manage your team members and their performance
          </p>
        </div>

        <div
          className={`bg-whi z-10  p-6 rounded-xl shadow-sm border border-gray-300 `}
        >
          <div className="flex flex-col gap-4">
            <Search
              placeholder="Search by name or email"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              onChange={onSearchChange}
              value={searchValue}
              className="w-full"
            />

            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="flex-1">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Filter by Department"
                  className="w-full"
                  size="large"
                  value={selectedDepartments}
                  onChange={setSelectedDepartments}
                  maxTagCount="responsive"
                >
                  {departmentOptions.map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="flex-1">
                <Select
                  mode="multiple"
                  allowClear
                  size="large"
                  placeholder="Filter by Rating"
                  className="w-full"
                  value={selectedRatings}
                  onChange={setSelectedRatings}
                  maxTagCount="responsive"
                >
                  {ratingOptions.map((rate) => (
                    <Option key={rate} value={rate}>
                      {rate}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={resetFilters}
                  size="large"
                  disabled={
                    !searchValue &&
                    selectedDepartments.length === 0 &&
                    selectedRatings?.length === 0
                  }
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full">
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <EmptyUsers
              resetFilters={resetFilters}
              message=" Try adjusting your search terms or filters to find what youre looking
            for."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
