import { User } from "@/interfaces/UserInterface";
import {
  Bookmark,
  Calendar,
  Eye,
  Mail,
  MapPin,
  TrendingUp,
} from "lucide-react";
import React from "react";
import StarRating from "./StarRating";

import { useDataStore } from "../../store/useDataStore"; // Changed import
import Image from "next/image";
import { message } from "antd";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  // Changed from useData() to useDataStore() with direct property access
  const toggleBookmark = useDataStore((state) => state.toggleBookmark);
  const [messageApi, contextHolder] = message.useMessage();

  const handleView = () => {
    // You can replace this with your actual view logic
    alert(`Viewing details for ${user.firstName} ${user.lastName}`);
  };

  const handleBookmark = () => {
    toggleBookmark(user.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {contextHolder}

      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            } // Fallback for missing image
            alt={`${user.firstName} ${user.lastName}`}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </h3>
          <div className="flex items-center gap-1 text-gray-600 mt-1">
            <Mail size={14} />
            <span className="text-sm truncate">{user.email}</span>
          </div>
        </div>

        {user.isBookmarked && (
          <Bookmark size={20} className="text-blue-500 fill-blue-500" />
        )}
      </div>

      {/* User Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={14} />
            <span className="text-sm">Age: {user.age}</span>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {user.company.department}
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={14} />
          <span className="text-sm">
            {user.address.city}, {user.address.country}
          </span>
        </div>

        <div className="pt-2">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Performance Rating
          </p>
          <StarRating rating={user.rating} />
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={handleView}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={handleBookmark}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
            user.isBookmarked
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-700"
          }`}
        >
          <Bookmark
            size={16}
            className={user.isBookmarked ? "fill-current" : ""}
          />
          {user.isBookmarked ? "Unbookmark" : "Bookmark"}
        </button>

        <button
          onClick={() =>
            messageApi.success(`Successfully Promoted ${user.firstName}`)
          }
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200 font-medium"
        >
          <TrendingUp size={16} />
          Promote
        </button>
      </div>
    </div>
  );
};

export default UserCard;
