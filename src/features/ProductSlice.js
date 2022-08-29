import { createSlice } from "@reduxjs/toolkit"; //iniate state action creator, tabs

const productSlice = createSlice({
  name: "product",
  initialState: {
    title: "ABC",
    price: "10.000",
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title;
      state.price = action.payload.price;
    },
  },
});

export const { update } = productSlice.actions;
export default productSlice.reducer;
