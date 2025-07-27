import { createContext, type Dispatch, type SetStateAction } from "react";

export interface IDelAndRet  { 
 seq : number  ; 
 refSeq : number ; 
 labSeq : number; 
 isDeleteSeq? : boolean ; 
}

export interface IContext  { 
    dataList : IDelAndRet[] ; 
    setDataList : Dispatch<SetStateAction<IDelAndRet[]>> ; 
}

export const DelAndRetContext = createContext<IContext | undefined>(undefined) ; 


