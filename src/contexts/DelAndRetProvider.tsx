import { useState } from "react";
import { DelAndRetContext, type IDelAndRet } from "./DelAndRetContext";

export const DelAndRetProvider : React.FC<{ children :  React.ReactNode}> = ({ children } ) => { 
    const [ dataList , setDataList] = useState<IDelAndRet[]>([]);
    return (
        <DelAndRetContext.Provider value={{ dataList , setDataList}}>
            {children}
        </DelAndRetContext.Provider>
    )
}
