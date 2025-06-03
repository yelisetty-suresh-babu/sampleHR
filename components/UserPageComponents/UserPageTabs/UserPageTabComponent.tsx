import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";

interface UserPageTabComponentProps {
  message?: string;
}

const UserPageTabComponent = ({ message }: UserPageTabComponentProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className=" h-screen flex items-center justify-center"
        style={{
          height: 200,
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <p className="text-lg text-center max-w-xl ">
        {`Welcome to the user ${message} tab. Here you’ll find a quick summary of the employee’s performance, recent activity, and important updates.`}
      </p>
    </div>
  );
};

export default UserPageTabComponent;
