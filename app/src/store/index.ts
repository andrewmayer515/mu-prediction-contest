import create from 'zustand';
import { devtools } from 'zustand/middleware';

//---------------------------------------------------------------------

type AppState = {
  loading: boolean;
  results: string;
  setLoading: (loadingState: boolean) => void;
  setResults: (results: string) => void;
};

export const useFormStore = create(devtools(() => ({})));

export const useAppStore = create<AppState>(
  devtools(set => ({
    loading: false,
    results: '',
    setLoading: loadingState => set({ loading: loadingState }),
    setResults: results => set({ results }),
  }))
);
