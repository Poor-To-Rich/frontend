import { create } from 'zustand';

export const useDraftMetaStore = create<{
  hasDraftData: boolean;
  setHasDraftData: (v: boolean) => void;
}>(set => ({
  hasDraftData: false,
  setHasDraftData: v => set({ hasDraftData: v }),
}));
