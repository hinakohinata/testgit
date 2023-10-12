// bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
import { Position } from "@/models/position";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface feeCollectionState {
  feeCollectionList: Position[];
  originList: Position[];
  selectedPosition: any | null
}

const initialState: feeCollectionState = {
  feeCollectionList: [],
  originList: [],
  selectedPosition: null
};
export const getFeeCollectionListAsync = createAsyncThunk("fee_collection/fetchpositions", async () => {
  const response = await axios.get<[]>(API_URL+"fee_collection");
  return response.data;
});



export const searchPositionAsync = createAsyncThunk(
  'fee_collection/search',
  async (text: string) => {
    const response = await axios.get<[]>(`${API_URL}fee_collection/search/${text}`);
    return response.data;
  }
);

export const createFeeCollectionListAsync = createAsyncThunk(
  "fee_collection/fetchCreateCheckin",
  async (data: any) => {
    const response = await axios.post<any>(`${API_URL}fee_collection/createByDate`, { data });
    console.log("list", response);
    return response.data;
  }
);


export const setOffFeeCollectionAsync = createAsyncThunk(
  'fee_collection/setOffFeeCollection',
  async (data: any) => {
    const response = await axios.post<any>(`${API_URL}fee_collection/setOff/${data}`);
    return response.data;
  }
);


export const setOnFeeCollectionAsync = createAsyncThunk(
  'fee_collection/setOnFeeCollection',
  async (data: any) => {
    const response = await axios.post<any>(`${API_URL}fee_collection/setOn/${data}`);
    return response.data;
  }
);

export const deleteFeeCollectionAsync = createAsyncThunk(
  'fee_collection/delete',
  async (id: number) => {
    await axios.delete(`${API_URL}fee_collection/${id}`);
    return id;
  }
)




export const booksSlice = createSlice({
  name: "positions-state",
  initialState,
  reducers: {

    addPosition: (state, action) => {
      const newPosition: any = action.payload;
      const originList: any = [...state.originList];
      originList.push(newPosition);
      state.feeCollectionList = originList;
      // thêm sản phẩm
    },
    removePosition: (state, action) => {
      // xoá sản phẩm
      const { id } = action.payload;
      const originList: any = [...state.originList];
      originList.filter((position: any) => position.id !== id);
      state.feeCollectionList = originList;
    },
    updatePosition: (state, action) => {
      // cập nhật sản phẩmupdateProduct: (state, action) => {
      const position = action.payload;
      const originList: any = [...state.originList];

      const index = originList.findIndex((p: any) => p.id === position.id);

      originList[index] = position;
      state.originList = originList;
    },
    resetfeeCollectionList: (state) => {
      const originList: any = [...state.originList];
      state.feeCollectionList = originList;
    },
    getPositionById(state, action) {
      const tmp = state.feeCollectionList.find(
        book => book.id == action.payload
      );
      state.selectedPosition = tmp
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeCollectionListAsync.fulfilled, (state, action) => {
        state.feeCollectionList = action.payload;
        state.originList = action.payload;
      })
      .addCase(createFeeCollectionListAsync.fulfilled, (state, action) => {
        toast.success("Đã cập nhật", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(createFeeCollectionListAsync.rejected, (state, action) => {
        toast.error("Có lỗi xảy ra!", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      
      .addCase(setOffFeeCollectionAsync.fulfilled, (state, action) => {
        state.feeCollectionList = action.payload;
        toast.success("Đã cập nhật ", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      
      .addCase(setOnFeeCollectionAsync.fulfilled, (state, action) => {
        state.feeCollectionList = action.payload;
        toast.success("Đã cập nhật ", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(deleteFeeCollectionAsync.fulfilled, (state, action) => {
        state.feeCollectionList = state.feeCollectionList.filter(
          item => item.id !== action.payload
        );
        toast.success("Đã xóa", {
          position: "top-right",
          autoClose: 5000,
        });
      })
  },
});
export const getfeeCollectionList = (state: RootState) => state.feeCollectionSlice.originList;
export const { resetfeeCollectionList, getPositionById } =
  booksSlice.actions;

export const getPosition = (state: RootState) => state.feeCollectionSlice.selectedPosition;
export default booksSlice.reducer;
