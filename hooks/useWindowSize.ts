"use client";
import { useLayoutEffect, useState } from "react";

const useWindowSize = (): Array<number> => {
  const [size, setSize] = useState([100, 100]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default useWindowSize;
