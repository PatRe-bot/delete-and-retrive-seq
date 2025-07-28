import { createContext, type Dispatch, type SetStateAction } from "react";

export interface IDelAndRet  { 
 seq : number  ; 
 refSeq : number ; 
 labSeq : number; 
 isDeleteSeq? : boolean ; 
}

export interface IHis { 
 no  : number  ;
 seq : number  ; 
 refSeq : number ; 
 labSeq : number; 
 eventCd : string ; 
 eventName : string ;
 timeStamp : string ; 
}



export interface IContext  { 
    dataList : IDelAndRet[] ; 
    setDataList : Dispatch<SetStateAction<IDelAndRet[]>> ; 
    currentSeq : number ;
    setCurrentSeq : Dispatch<SetStateAction<number>> ;
    historyList :  IHis[];
    setHistoryList : Dispatch<SetStateAction<IHis[]>>
    reStoreList : IDelAndRet[];
    setRestoreList : Dispatch<SetStateAction<IDelAndRet[]>>
    selectedOption : IDelAndRet[]
    setSelectedOption :  Dispatch<SetStateAction<IDelAndRet[]>>
}

export const DelAndRetContext = createContext<IContext | undefined>(undefined) ; 


