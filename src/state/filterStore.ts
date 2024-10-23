import {create} from 'zustand';

interface FilterStore {
  search: string;
  sort: 'asc' | 'desc';
  filter: 'all' | 'success' | 'failure';
  setSearch: (search: string) => void;
  setSort: (sort: 'asc' | 'desc') => void;
  setFilter: (filter: 'all' | 'success' | 'failure') => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: '',
  sort: 'asc',
  filter: 'all',
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  setFilter: (filter) => set({ filter }),
}));