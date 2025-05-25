import { useState, useMemo } from "react";
import { User } from "@/interfaces/UserInterface";

// Utility to filter users
function filterUsers(
  users: User[],
  search: string,
  departments: string[],
  ratings: string | null
): User[] {
  const trimmed = search.trim().toLowerCase();

  return users.filter((user) => {
    const matchesSearch =
      !trimmed ||
      [user.firstName, user.maidenName, user.lastName, user.email].some(
        (field) => field.toLowerCase().includes(trimmed)
      );

    const matchesDepartment =
      departments.length === 0 || departments.includes(user.company.department);
    const matchesRating =
      ratings != null ? ratings.includes(String(user.rating)) : true;

    return matchesSearch && matchesDepartment && matchesRating;
  });
}

export const useUserFiltering = (users: User[] | null) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string | null>(null);

  // Memoized filter options to avoid recalculation on every render
  const departmentOptions = useMemo(() => {
    return Array.from(
      new Set(users?.map((u) => u.company.department) || [])
    ).sort();
  }, [users]);

  const ratingOptions = useMemo(() => {
    return Array.from(
      new Set(users?.map((u) => String(u.rating)) || [])
    ).sort();
  }, [users]);

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return filterUsers(
      users,
      searchValue,
      selectedDepartments,
      selectedRatings
    );
  }, [users, searchValue, selectedDepartments, selectedRatings]);

  // Reset filters function
  const resetFilters = () => {
    setSearchValue("");
    setSelectedDepartments([]);
    setSelectedRatings(null);
  };

  return {
    // Filter values
    searchValue,
    selectedDepartments,
    selectedRatings,

    // Filter setters
    setSearchValue,
    setSelectedDepartments,
    setSelectedRatings,

    // Filter options
    departmentOptions,
    ratingOptions,

    // Filtered results
    filteredUsers,

    // Utility functions
    resetFilters,
  };
};
