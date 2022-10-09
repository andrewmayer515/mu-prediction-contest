import { createContext } from 'react';

//---------------------------------------------------------------------

interface ResultContextInterface {
  result: string | undefined;
  setResult: (text: string) => void;
}

export interface RosterContextInterface {
  [name: string]: string;
}

interface LoadingContextInterface {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const ResultContext = createContext<
  ResultContextInterface | Record<string, never>
>({});
export const RosterContext = createContext<
  RosterContextInterface | Record<string, never>
>({});
export const LoadingContext = createContext<
  LoadingContextInterface | Record<string, never>
>({});
