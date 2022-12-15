import { useContext } from "react";
import HomeProvider from "./HomeProvider";

//Custom hooks to use context data globally
const useHome = () => {
  return useContext(HomeProvider);
};

export default useHome;
