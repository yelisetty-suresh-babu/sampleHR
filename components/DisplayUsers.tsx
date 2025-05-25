"use client";
import React from "react";
import { useData } from "../context/DataContext";
import { useUserFiltering } from "../hooks/useUserFiltering"; // Adjust path as needed
import { Input, Select } from "antd";
import { SearchProps } from "antd/es/input";
import CustomSpinner from "./CustomSpinner";
import UserCard from "./UserCard";

const { Search } = Input;
const { Option } = Select;

const DisplayUsers = () => {
  const { users, loading } = useData();
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
  } = useUserFiltering(users);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) return <CustomSpinner />;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        <Search
          placeholder="Search by name or email"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          onChange={onSearchChange}
          value={searchValue}
        />

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:flex-1">
            <Select
              mode="multiple"
              allowClear
              placeholder="Filter by Department"
              className="w-full"
              size="large"
              value={selectedDepartments}
              onChange={setSelectedDepartments}
            >
              {departmentOptions.map((dept) => (
                <Option key={dept} value={dept}>
                  {dept}
                </Option>
              ))}
            </Select>
          </div>

          <div className="w-full md:flex-1">
            <Select
              // mode="multiple"
              allowClear
              size="large"
              placeholder="Filter by Rating"
              className="w-full"
              value={selectedRatings}
              onChange={setSelectedRatings}
            >
              {ratingOptions.map((rate) => (
                <Option key={rate} value={rate}>
                  {rate}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <li className="text-gray-500">No matching users found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DisplayUsers;
