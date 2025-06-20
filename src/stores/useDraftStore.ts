import { create } from 'zustand';

interface Props {
  shouldSave: boolean;
  enableSave: () => void;
  disableSave: () => void;
}

export const useDraftStore = create<Props>(set => ({
  shouldSave: true,
  enableSave: () => set({ shouldSave: true }),
  disableSave: () => set({ shouldSave: false }),
}));
