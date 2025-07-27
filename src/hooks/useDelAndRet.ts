import { useContext } from "react";
import { DelAndRetContext } from "../contexts/DelAndRetContext";

export const useDelAndRet = () => {
  const context = useContext(DelAndRetContext);
  // ต้องเช็คเพราะ อาจจะเป็น undefined
  if (!context) {
    throw new Error("useDelAndRet must be used within DelAndRetProvider");
  }
  const { setDataList, dataList } = context;
  const dataLength = dataList.length;
  return { dataList, setDataList, dataLength };
};
