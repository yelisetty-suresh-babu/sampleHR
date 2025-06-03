"use client";

import { User } from "@/interfaces/UserInterface";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import StarRating from "./../HomePageComponents/StarRating";

interface UserPageHeaderProps {
  user: User | null;
}

const UserPageHeader = ({ user }: UserPageHeaderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center p-8">
          <div className="w-80 h-80 bg-gray-200 rounded-full"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-64"></div>
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="h-6 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 -gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl -z-10"></div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center p-8 lg:p-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <Image
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
              alt={`${user.firstName} ${user.lastName}`}
              width={320}
              height={320}
              className="w-80 h-80 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute bottom-6 right-6 w-8 h-8 bg-green-500 rounded-full ring-4 ring-white dark:ring-gray-800 shadow-lg"></div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold  b-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text  leading-tight">
              {user.firstName} {user.lastName}
            </h1>
            {user.company && (
              <div className="flex items-center justify-center lg:justify-start gap-2 text-lg font-medium ">
                <Building2 className="w-5 h-5" />
                <span>{user.company.title}</span>
                <span className="text-gray-400">•</span>
                <span>{user.company.department}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center lg:items-start gap-2">
            <StarRating rating={user.rating} />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {user.rating.toFixed(1)} out of 5.0
            </span>
          </div>

          <div className="space-y-4 w-full max-w-md">
            <div className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 cursor-pointer">
              <div className="flex-shrink-0 w-10 h-10  rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-">Email</p>
                <p className="text-base font-semibold  truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4  rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-200">
              <div className="flex-shrink-0 w-10 h-10  rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium ">Phone</p>
                <p className="text-base font-semibold ">{user.phone}</p>
              </div>
            </div>

            {user.address && (
              <div className="flex items-start gap-4 p-4  rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-200">
                <div className="flex-shrink-0 w-10 h-10  rounded-lg flex items-center justify-center mt-1">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium ">Address</p>
                  <p className="text-base font-semibold ">
                    {user.address.city}, {user.address.state}
                  </p>
                  <p className="text-sm ">{user.address.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageHeader;
