import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
    _id: string;
    imgScr: string;
    fileKey: string;
    name: string;
    price: number;  
    category: string;
  }

const initialState: IProduct = {
    _id: "",
    imgScr: "",
    fileKey: "",
    name: "",
    price: 0,
    category: "",
};

export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<IProduct>) => {
            return action.payload;
        },
    },
});

export const {setProduct} = productSlice.actions;
export default productSlice.reducer;