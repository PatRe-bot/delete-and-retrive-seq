import { useContext } from "react";
import { DelAndRetContext } from "../contexts/DelAndRetContext";

export const useDelAndRet = () => {
  const context = useContext(DelAndRetContext);
  // ต้องเช็คเพราะ อาจจะเป็น undefined
  if (!context) {
    throw new Error("useDelAndRet must be used within DelAndRetProvider");
  }
  const { setDataList, dataList, currentSeq, setCurrentSeq } = context;
  const rearrange = true;
  const dataLength = dataList.filter((item) => !item.isDeleteSeq)?.length;
  const allDelete = dataList.every((del) => del.isDeleteSeq);
  const handleInitData = () => {
    setCurrentSeq(1);
    setDataList([
      {
        seq: 1,
        refSeq: 1,
        labSeq: 1,
      },
      {
        seq: 2,
        refSeq: 2,
        labSeq: 2,
      },
      {
        seq: 3,
        refSeq: 3,
        labSeq: 3,
      },
      {
        seq: 4,
        refSeq: 4,
        labSeq: 4,
      },
      {
        seq: 5,
        refSeq: 5,
        labSeq: 5,
      },
      {
        seq: 6,
        refSeq: 6,
        labSeq: 6,
      },
    ]);
  };
  const handleChangeSeq = (newSeq: number) => {
    if (isNaN(newSeq) || newSeq < 0 || !Number.isInteger(newSeq)) {
      console.error(`Invalid seq ${newSeq}`);
      return;
    }
    setCurrentSeq(newSeq);
  };

  const handleDeleteSeq = () => {
    let newDataAfterDel = [...dataList]
    newDataAfterDel = newDataAfterDel.map((item , index) => { 
        if(index === currentSeq - 1 && !item.isDeleteSeq) { 
            return { ...item , isDeleteSeq : true}
        }
        if(rearrange &&  index > currentSeq - 1 && !item.isDeleteSeq) { 
            return { ...item , seq : item.seq -1}
        }
        return item ;
    });
    const newSeqAfterDel = newDataAfterDel.findIndex((d ) => !d.isDeleteSeq);
    setDataList(newDataAfterDel)
    setCurrentSeq(newSeqAfterDel + 1)
  };
  return {
    dataList,
    currentSeq,
    dataLength,
    handleInitData,
    handleChangeSeq,
    handleDeleteSeq,
    allDelete,
  };
};
