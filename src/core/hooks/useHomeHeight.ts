import { useState } from 'react';

export const useHomeHeight = () => {
  const [ height, setHeight ] = useState(0);
  return {
    height,
    setHeight,
  }
};