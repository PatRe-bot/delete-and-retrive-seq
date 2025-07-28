import { useContext } from "react";
import { DelAndRetContext } from "../contexts/DelAndRetContext";
import dayjs from "dayjs";

export const useDelAndRet = () => {
  const context = useContext(DelAndRetContext);
  // ต้องเช็คเพราะ อาจจะเป็น undefined
  if (!context) {
    throw new Error("useDelAndRet must be used within DelAndRetProvider");
  }
  const {
    setDataList,
    dataList,
    currentSeq,
    setCurrentSeq,
    historyList,
    setHistoryList,
    setRestoreList,
    reStoreList,
    selectedOption,
    setSelectedOption,
  } = context;
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
    setHistoryList([]);
    setRestoreList([]);
    setSelectedOption([]);
  };
  const handleChangeSeq = (newSeq: number) => {
    if (isNaN(newSeq) || newSeq < 0 || !Number.isInteger(newSeq)) {
      console.error(`Invalid seq ${newSeq}`);
      return;
    }
    setCurrentSeq(newSeq);
  };

  const handleDeleteSeq = () => {
    let newDataAfterDel = [...dataList];
    newDataAfterDel = newDataAfterDel.map((item, index) => {
      if (index === currentSeq - 1 && !item.isDeleteSeq) {
        return { ...item, isDeleteSeq: true };
      }
      if (rearrange && index > currentSeq - 1 && !item.isDeleteSeq) {
        return { ...item, seq: item.seq - 1 };
      }
      return item;
    });
    const newSeqAfterDel = newDataAfterDel.findIndex((d) => !d.isDeleteSeq);
    setDataList(newDataAfterDel);
    setCurrentSeq(newSeqAfterDel + 1);
    setHistoryList((prev) => [
      ...prev,
      {
        no: prev.length + 1,
        timeStamp: dayjs().format(),
        seq: dataList[currentSeq - 1].seq,
        refSeq: dataList[currentSeq - 1].refSeq,
        labSeq: dataList[currentSeq - 1].labSeq,
        eventCd: "EVENT_DELSEQ",
        eventName: "Delete Seq",
      },
    ]);
    setRestoreList((prev) => [
      ...prev,
      {
        seq: dataList[currentSeq - 1].seq,
        refSeq: dataList[currentSeq - 1].refSeq,
        labSeq: dataList[currentSeq - 1].labSeq,
      },
    ]);
  };

  const handleRetriveData = () => {
    let newDataListAfterRet = dataList.map((item) => ({ ...item }));
    console.log(dataList, "BEFORE ");
    // เปลี่ยน flag
    for (let i = 0; i < newDataListAfterRet.length; i++) {
      for (let j = 0; j < selectedOption.length; j++) {
        if (
          newDataListAfterRet[i].seq === selectedOption[j].seq &&
          newDataListAfterRet[i].labSeq === selectedOption[j].labSeq &&
          newDataListAfterRet[i].refSeq === selectedOption[j].refSeq &&
          newDataListAfterRet[i].isDeleteSeq
        ) {
          newDataListAfterRet[i].isDeleteSeq = false;
        }
      }
    }
    // เรียง seq
    let newSeq = 0;
    newDataListAfterRet = newDataListAfterRet.map((n) => {
      if (rearrange && !n.isDeleteSeq) {
        newSeq = newSeq + 1;
      }
      return { ...n, seq: newSeq };
    });
    console.log(newDataListAfterRet, "AFTER");
    setDataList(newDataListAfterRet);
    setHistoryList((prev) => [
      ...prev,
      ...selectedOption.map((sel) => {
        return {
          no: prev.length + 1,
          timeStamp: dayjs().format(),
          seq: sel.seq,
          refSeq: sel.refSeq,
          labSeq: sel.labSeq,
          eventCd: "EVENT_RESTORESEQ",
          eventName: "Restore Seq",
        };
      }),
    ]);
    setRestoreList((prev) => { 
      return prev.filter((notSelected) => !selectedOption.includes(notSelected))
    });
    setSelectedOption([]);
  };
  return {
    dataList,
    currentSeq,
    dataLength,
    handleInitData,
    handleChangeSeq,
    handleDeleteSeq,
    allDelete,
    historyList,
    reStoreList,
    selectedOption,
    setSelectedOption,
    handleRetriveData,
  };
};
