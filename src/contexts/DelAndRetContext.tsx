import { createContext, type Dispatch, type SetStateAction } from "react";

export interface IDelAndRet  { 
 seq : number  ; 
 refSeq : number ; 
 labSeq : number; 
 isDeleteSeq? : boolean ; 
}

export interface IHis { 
 seq : number  ; 
 refSeq : number ; 
 labSeq : number; 
 eventCd : string ; 
 eventname : string ;
 timeStamp : string ; 
}

export interface IContext  { 
    dataList : IDelAndRet[] ; 
    setDataList : Dispatch<SetStateAction<IDelAndRet[]>> ; 
    currentSeq : number ;
    setCurrentSeq : Dispatch<SetStateAction<number>> ;
    historyList :  IHis[];
    setHistoryList : Dispatch<SetStateAction<IHis[]>>
}

export const DelAndRetContext = createContext<IContext | undefined>(undefined) ; 


