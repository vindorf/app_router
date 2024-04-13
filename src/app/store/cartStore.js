
import axios from "axios";
import { create } from "zustand";




export const useCartStore = create((set) => ({
  cart: [],
  fetch: async (email) => {
    const resp = await axios.get(`/api/cart?email=${email}`)
    set({cart: await resp.data.cart})
  },
  //addToCart: (product) => set((state) => ({cart: [...state.cart, product]}) ) ,
  addToCart: async (email, _id) => {
    await axios.post('/api/cart/',{email: email, _id:_id});
  },
  // removeFromCart: (productID) => set((state) => ({cart: state.cart.filter(product => product.id !== productID)})) ,
  removeFromCart: async (email, _id) => {
    await axios.put('/api/cart/', {email: email, _id: _id});
  },
  clearCart: () => set({cart: []}),
}));

