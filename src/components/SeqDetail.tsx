import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDelAndRet } from "../hooks/useDelAndRet";

export const SeqDetail = () => {
  const {
    dataList,
    dataLength,
    handleInitData,
    currentSeq,
    handleChangeSeq,
    handleDeleteSeq,
    allDelete,
    historyList,
    reStoreList,
    setSelectedOption,
    selectedOption,
    handleRetriveData,
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
      <button disabled={reStoreList.length === 0 || selectedOption.length === 0} onClick={handleRetriveData}>
        Retrive Seq
      </button>
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
          disabled={
            currentDataDisplay >= dataLength ||
            dataLength === 0 ||
            !hasNextValidSeq()
          }
          onClick={() => {
            const nextSeq = findNextValidSeq();
            console.log(`Going forward from ${currentSeq} to ${nextSeq}`);
            handleChangeSeq(nextSeq);
          }}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
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
        {historyList.length > 0 &&
          historyList.map((h) => {
            return (
              <div key={h.seq + h.refSeq + h.eventCd}>
                <p>No : {h.no}</p>
                <p>Seq : {h.seq} </p>
                <p>RefSeq : {h.refSeq} </p>
                <p>Lab Seq : {h.labSeq} </p>
                <p>Event : {h.eventName}</p>
                <p>Time stamp : {h.timeStamp}</p>
              </div>
            );
          })}
        <div>
          Restore Options
          <Autocomplete
            options={reStoreList}
            value={selectedOption ?? []}
            sx={{ width: 300 }}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
              />
            )}
            getOptionLabel={(option) => `${option.seq} - ${option.refSeq}`}
            isOptionEqualToValue={(option, value) =>
              option.seq === value.seq && option.refSeq === value.refSeq
            }
            onChange={(event, value) => {
              setSelectedOption(value);
            }}
          />
        </div>
      </div>
    </>
  );
};
