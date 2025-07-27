import { useDelAndRet } from "../hooks/useDelAndRet";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const SeqDetail = () => {
  const {
    dataList,
    dataLength,
    handleInitData,
    currentSeq,
    handleChangeSeq,
    handleDeleteSeq,
    allDelete,
  } = useDelAndRet();

  const currentData = dataList[currentSeq - 1];
  const currentDataDisplay = dataLength === 0 ? 0 : currentData.seq;

  // Helper function to find the next non-deleted sequence going backward
  const findPreviousValidSeq = () => {
    let targetSeq = currentSeq - 1;
    
    // Keep going back until we find a non-deleted sequence or reach the beginning
    while (targetSeq >= 1) {
      const targetData = dataList[targetSeq - 1];
      if (targetData && !targetData.isDeleteSeq) {
        return targetSeq;
      }
      targetSeq--;
    }
    
    return currentSeq; // Return current if no valid previous sequence found
  };

  // Helper function to find the next non-deleted sequence going forward
  const findNextValidSeq = () => {
    let targetSeq = currentSeq + 1;
    
    // Keep going forward until we find a non-deleted sequence or reach the end
    while (targetSeq <= dataList.length) {
      const targetData = dataList[targetSeq - 1];
      if (targetData && !targetData.isDeleteSeq) {
        return targetSeq;
      }
      targetSeq++;
    }
    
    return currentSeq; // Return current if no valid next sequence found
  };

  // Helper function to check if there's a valid previous sequence
  const hasPreviousValidSeq = () => {
    return findPreviousValidSeq() !== currentSeq;
  };

  // Helper function to check if there's a valid next sequence
  const hasNextValidSeq = () => {
    return findNextValidSeq() !== currentSeq;
  };

  return (
    <>
      <button onClick={handleInitData}>Init Data</button>
      <button
        disabled={dataLength === 0 || allDelete}
        onClick={handleDeleteSeq}
      >
        Delete Seq
      </button>
      <button>Retrive Seq</button>
      <div>
        <button
          disabled={currentDataDisplay <= 1 || !hasPreviousValidSeq()}
          onClick={() => {
            const prevSeq = findPreviousValidSeq();
            console.log(`Going back from ${currentSeq} to ${prevSeq}`);
            handleChangeSeq(prevSeq);
          }}
        >
          <ArrowBackIosNewIcon />
        </button>
        {currentDataDisplay} / {dataLength}
        <button
          disabled={currentDataDisplay >= dataLength || dataLength === 0 || !hasNextValidSeq()}
          onClick={() => {
            const nextSeq = findNextValidSeq();
            console.log(`Going forward from ${currentSeq} to ${nextSeq}`);
            handleChangeSeq(nextSeq);
          }}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
      {currentData ? (
        <div>
          <p>Seq : {currentData.seq} </p>
          <p>RefSeq : {currentData.refSeq} </p>
          <p>Lab Seq : {currentData.labSeq} </p>
          <p>isDelete Seq : {currentData.isDeleteSeq + ""}</p>
        </div>
      ) : (
        <div>No Data</div>
      )}
    </>
  );
};