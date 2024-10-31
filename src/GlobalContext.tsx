import { createContext, useState } from 'react';

export const BASE_URL = 'http://localhost:8000/api';

// 示例
export const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: any) => {
  const [globalVar, setGlobalVar] = useState('初始值');

  return (
    <GlobalContext.Provider value={{ globalVar, setGlobalVar }}>{children}</GlobalContext.Provider>
  );
};
