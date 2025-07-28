import { useState } from "react";
import {
  DelAndRetContext,
  type IDelAndRet,
  type IHis,
} from "./DelAndRetContext";

export const DelAndRetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataList, setDataList] = useState<IDelAndRet[]>([]);
  const [currentSeq, setCurrentSeq] = useState<number>(1);
  const [historyList, setHistoryList] = useState<IHis[]>([]);
  const [reStoreList, setRestoreList] = useState<IDelAndRet[]>([]);
  const [selectedOption, setSelectedOption] = useState<IDelAndRet[] | undefined>();
  return (
    <DelAndRetContext.Provider
      value={{
        dataList,
        setDataList,
        currentSeq,
        setCurrentSeq,
        historyList,
        setHistoryList,
        reStoreList,
        setRestoreList,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </DelAndRetContext.Provider>
  );
};
