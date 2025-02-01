import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
}

const initialState: Array<IProduct> = [];

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProductIndex = state.findIndex((pro) => pro.id === action.payload.id);
      if (existingProductIndex === -1) {
        state.push(action.payload); 
      } else {
        state[existingProductIndex].quantity += action.payload.quantity; 
      }
    },

    
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },

   
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingProductIndex = state.findIndex((pro) => pro.id === action.payload);
      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingProductIndex = state.findIndex((pro) => pro.id === action.payload);
      if (existingProductIndex !== -1) {
        if (state[existingProductIndex].quantity > 1) {
          state[existingProductIndex].quantity -= 1;
        } else {
         
          state.splice(existingProductIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;