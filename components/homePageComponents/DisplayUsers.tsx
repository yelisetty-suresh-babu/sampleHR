"use client";
import React from "react";
import { useData } from "../../context/DataContext";
import { useUserFiltering } from "../../hooks/useUserFiltering";
import { Input, Select, Button } from "antd";
import { SearchProps } from "antd/es/input";
import CustomSpinner from "./CustomSpinner";
import UserCard from "./UserCard";
import { RefreshCw } from "lucide-react";
import EmptyUsers from "./EmptyUsers";

import { BackgroundBeams } from "../UIComponents/BackgroundBeams";

const { Search } = Input;
const { Option } = Select;

const DisplayUsers = () => {
  const { users, loading, refetch } = useData();
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

  if (loading) return <CustomSpinner />;

  const bookmarkedCount =
    users?.filter((user) => user.isBookmarked).length || 0;
  const totalUsers = users?.length || 0;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4  min-h-screen">
      <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full " />

      <div className="w-full max-w-7xl flex flex-col gap-6 z-10">
        <div className="text-center mb-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">
            Team Directory
          </h1>
          <p className="text-gray-600 mb-4 text-xl">
            Manage your team members and their performance
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              onClick={refetch}
              icon={<RefreshCw size={16} />}
              size="large"
              type="primary"
            >
              Refresh Data
            </Button>
            <div className="text-sm text-gray-500 bg-white px-4 py-4 rounded-lg shadow-sm">
              Total: {totalUsers} | Bookmarked: {bookmarkedCount} | Showing:{" "}
              {filteredUsers.length}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
            // <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            //   <div className="text-gray-400 mb-4">
            //     <svg
            //       className="mx-auto h-12 w-12"
            //       fill="none"
            //       viewBox="0 0 24 24"
            //       stroke="currentColor"
            //     >
            //       <path
            //         strokeLinecap="round"
            //         strokeLinejoin="round"
            //         strokeWidth={2}
            //         d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            //       />
            //     </svg>
            //   </div>
            //   <h3 className="text-lg font-medium text-gray-900 mb-2">
            //     No users found
            //   </h3>
            //   <p className="text-gray-500 mb-4">
            //     Try adjusting your search terms or filters to find what youre
            //     looking for.
            //   </p>
            //   <Button onClick={resetFilters} type="primary">
            //     Clear All Filters
            //   </Button>
            // </div>
            <EmptyUsers resetFilters={resetFilters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
