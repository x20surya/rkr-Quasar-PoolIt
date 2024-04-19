import { createContext,useContext } from "react";

export type GlobalContent = {
    location: Object
    setLocation:(c: string) => void
  }

export const UserLocationContext = createContext<GlobalContent>({
    location:{},
    setLocation : ()=> {}
});

export const useUserLocationContext = ()=>useContext(UserLocationContext)
