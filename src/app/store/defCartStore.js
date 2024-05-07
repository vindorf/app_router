import {create} from "zustand";

export const useDefCartStore = create((set) => ({
    dCart: {},
    total: 0,
    amount: 0,
    setDCart: (items) => set(() => ({dCart: items})),
    setTotalSum: (sum) => set(() => ({total: sum})),
    setIAmount: (nr) => set(() => ({amount: nr})),
}))