
'use client';

import { truncateSync } from "fs";
import { Children, useEffect, useState } from "react";
interface ClinetOnlyProps{ 
    children:React.ReactNode;
}
const ClientOnly:React.FC<ClinetOnlyProps> = ({children}) => {
    const[hasmounted,setHasMounted]=useState(false);
    useEffect(()=>{
        setHasMounted(true)
    },[])
   if(!hasmounted){
    return null;
   } 
    return ( 
        <>
        {children}
        </>
     );
}
 
export default ClientOnly;