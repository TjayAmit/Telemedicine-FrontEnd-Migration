import { useContext } from 'react';
import CaseProvider from './CaseProvider';

const useCase = () => {
  return useContext(CaseProvider);
};

export default useCase;
