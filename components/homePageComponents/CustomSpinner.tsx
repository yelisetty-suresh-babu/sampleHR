import useWindowSize from "@/hooks/useWindowSize";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface CustomSpinnerProps {
  customHeight?: number;
}
const CustomSpinner = ({
  customHeight,
}: CustomSpinnerProps): React.ReactNode => {
  const [, height] = useWindowSize();
  return (
    <div
      className=" h-screen flex items-center justify-center"
      style={{
        height: customHeight != undefined ? customHeight : height - 100,
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default CustomSpinner;
