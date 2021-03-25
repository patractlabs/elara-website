import { useContext } from 'react';
import { ApiContext } from '../context/api-context';
import { ApiProps } from '../types/classes/api';

export function useApi(): ApiProps {
  return useContext(ApiContext);
}
