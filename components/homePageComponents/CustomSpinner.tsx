import useWindowSize from "@/hooks/useWindowSize";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const CustomSpinner = (): React.ReactNode => {
  const [, height] = useWindowSize();
  return (
    <div
      className="h-full flex items-center justify-center"
      style={{ height: height - 100 }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default CustomSpinner;
