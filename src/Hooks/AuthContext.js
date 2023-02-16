import { useContext } from 'react';
import DataProvider from '../Context/DataProvider';

//Custom hooks to use context data globally
const useAuth = () => {
  return useContext(DataProvider);
};

export default useAuth;
