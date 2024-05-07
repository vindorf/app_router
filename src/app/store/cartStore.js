import axios from "axios";
import { create } from "zustand";

export const useCartStore = create((set) => ({
  status: "",
  cart: [],
  fetch: async (email) => {
    const resp = await axios.get(`/api/cart?email=${email}`);
    set({ cart: await resp.data.cart });
  },
  addToCart: async (email, _id) => {
    const res = await axios.post("/api/cart/", { email: email, _id: _id });
    set({ status: await res.data.status });
  },
  removeFromCart: async (email, _id) => {
    await axios.put("/api/cart/", { email: email, _id: _id });
  },
  clearCart: () => set({ cart: [] }),
}));
