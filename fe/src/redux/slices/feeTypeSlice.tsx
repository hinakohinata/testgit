// bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
import { Position } from "@/models/position";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface feeTypeState {
  feeTypeList: Position[];
  originList: Position[];
  selectedPosition: any | null
}

const initialState: feeTypeState = {
  feeTypeList: [],
  originList: [],
  selectedPosition: null
};
export const getFeeTypeListAsync = createAsyncThunk("fee_type/fetchpositions", async () => {
  const response = await axios.get<[]>(API_URL+"fee_type");
  return response.data;
});

export const createPositionAsync = createAsyncThunk(
  'fee_type/create',
  async (positionData: any) => {
    const response = await axios.post<any>(API_URL+'fee_type', positionData);
    console.log(response)
    return response.data.name;
  }
);

export const updatePositionAsync = createAsyncThunk(
  'fee_type/update',
  async (updatedPosition: any) => {
    const response = await axios.put<any>(`${API_URL}fee_type/${updatedPosition.id}`, updatedPosition);
    return updatedPosition;
  }
);

export const deletePositionAsync = createAsyncThunk(
  'fee_type/delete',
  async (positionId: number) => {
    await axios.delete(`${API_URL}fee_type/${positionId}`);
    return positionId;
  }
)
export const searchPositionAsync = createAsyncThunk(
  'fee_type/search',
  async (text: string) => {
    const response = await axios.get<[]>(`${API_URL}fee_type/search/${text}`);
    return response.data;
  }
);

export const getTypeForAddFeeCollectionAsync = createAsyncThunk("other/getTypeForAddFeeCollection", async () => {
  const response = await axios.get<[]>(`${API_URL}fee_type/getTypeForAddFeeCollection`);
  return response.data;
});








export const booksSlice = createSlice({
  name: "positions-state",
  initialState,
  reducers: {

    addPosition: (state, action) => {
      const newPosition: any = action.payload;
      const originList: any = [...state.originList];
      originList.push(newPosition);
      state.feeTypeList = originList;
      // thêm sản phẩm
    },
    removePosition: (state, action) => {
      // xoá sản phẩm
      const { id } = action.payload;
      const originList: any = [...state.originList];
      originList.filter((position: any) => position.id !== id);
      state.feeTypeList = originList;
    },
    updatePosition: (state, action) => {
      // cập nhật sản phẩmupdateProduct: (state, action) => {
      const position = action.payload;
      const originList: any = [...state.originList];

      const index = originList.findIndex((p: any) => p.id === position.id);

      originList[index] = position;
      state.originList = originList;
    },
    resetfeeTypeList: (state) => {
      const originList: any = [...state.originList];
      state.feeTypeList = originList;
    },
    getPositionById(state, action) {
      const tmp = state.feeTypeList.find(
        book => book.id == action.payload
      );
      state.selectedPosition = tmp
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeTypeListAsync.fulfilled, (state, action) => {
      state.feeTypeList = action.payload;
      state.originList = action.payload;
    })
      .addCase(createPositionAsync.fulfilled, (state, action) => {
        toast.success("Đã thêm " + action.payload, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(updatePositionAsync.fulfilled, (state, action) => {
        const index = state.feeTypeList.findIndex(item => item.id === action.payload.id);
        state.feeTypeList[index] = action.payload;
        toast.success("Đã cập nhật " + action.payload.id + ' - ' + action.payload.name, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(deletePositionAsync.fulfilled, (state, action) => {
        state.feeTypeList = state.feeTypeList.filter(
          item => item.id !== action.payload
        );
        toast.success(`Đã xóa `)
      })
      .addCase(getTypeForAddFeeCollectionAsync.fulfilled, (state, action) => {
        state.feeTypeList = action.payload;
      })
  },
});
export const getfeeTypeList = (state: RootState) => state.feeTypeSlice.feeTypeList;
export const { resetfeeTypeList,  getPositionById } =
  booksSlice.actions;

export const getPosition = (state: RootState) => state.feeTypeSlice.selectedPosition;
export default booksSlice.reducer;
