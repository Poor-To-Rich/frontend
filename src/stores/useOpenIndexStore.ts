import { create } from "zustand";

interface OpenIndexsState{
    openIndexes: number[];
    addOpenIndex: (index: number) => void;
}
const useOpenIndexStore = create<OpenIndexsState>((set,get) => ({
    openIndexes: [],
    addOpenIndex: (openIndex: number) => {
        const current = get().openIndexes;
        const updated = current.includes(openIndex)
          ? current.filter(i => i !== openIndex)
          : [...current, openIndex];
    
        set({ openIndexes: updated });
      },
}))

export default useOpenIndexStore