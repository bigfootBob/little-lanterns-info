import { createContext, useContext } from 'react';

export const LanternsContext = createContext({ childId: null });

export function useLanterns() {
  return useContext(LanternsContext);
}
