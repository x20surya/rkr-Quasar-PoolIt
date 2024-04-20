import { useEffect } from "react";
import { Text } from "./Themed";
import axios from "axios";


   
export function FindingDrivers(){


    useEffect(()=>{
        const interval = setInterval(async ()=>{
            await axios.get("http://192.168.29.196:3000/hasMatched/1",{})
            .then((r)=>{console.log(r.data)})
            .catch((e)=>{console.log(e)})
            console.log(1)
        },10000);
        return ()=>clearInterval(interval);
      })
    return(
       <Text>Hi There</Text>
    )
}