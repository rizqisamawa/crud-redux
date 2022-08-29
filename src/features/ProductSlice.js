import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

//iniate state action creator, tabs - createSlice
//asyc in redux - createAsyncThunk
//manipulate state in format array object and normalisation data for easy to use nested - createEntityAdapter

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await axios.get("http://localhost:5000/product");
    return res.data;
  }
);

export const newProducts = createAsyncThunk(
  "products/newProducts",
  async ({ title, price }) => {
    const res = await axios.post("http://localhost:5000/product", {
      title,
      price,
    });
    return res.data;
  }
);

export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async ({ id, title, price }) => {
    const res = await axios.patch(`http://localhost:5000/product/${id}`, {
      id,
      title,
      price,
    });
    return res.data;
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    await axios.get(`http://localhost:5000/product/${id}`);
    return id;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [newProducts.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [updateProducts.fulfilled]: (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [deleteProducts.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
  },
  // initialState: {
  //   title: "ABC",
  //   price: "10.000",
  // },
  // reducers: {
  //   update: (state, action) => {
  //     state.title = action.payload.title;
  //     state.price = action.payload.price;
  //   },
  // },
});

// export const { update } = productSlice.actions;
export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);
export default productSlice.reducer;
