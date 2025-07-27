import { useDelAndRet } from "../hooks/useDelAndRet";

export const SeqDetail = () => {
  const { dataList, setDataList, dataLength } = useDelAndRet();
  return <div>{dataLength}</div>;
};
