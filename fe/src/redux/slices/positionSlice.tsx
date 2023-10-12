// bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
import { Position } from "@/models/position";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface bookState {
  positionList: Position[];
  originList: Position[];
  selectedPosition: any | null
}

const initialState: bookState = {
  positionList: [],
  originList: [],
  selectedPosition: null
};
export const getPositonListAsync = createAsyncThunk("positions/fetchpositions", async () => {
  const response = await axios.get<[]>(API_URL+"positions");
  return response.data;
});

export const createPositionAsync = createAsyncThunk(
  'positions/create',
  async (positionData: any) => {
    const response = await axios.post<any>(API_URL+'positions', positionData);
    console.log(response)
    return response.data.name;
  }
);

export const updatePositionAsync = createAsyncThunk(
  'positions/update',
  async (updatedPosition: any) => {
    const response = await axios.put<any>(`${API_URL}positions/${updatedPosition.id}`, updatedPosition);
    return updatedPosition;
  }
);

export const deletePositionAsync = createAsyncThunk(
  'positions/delete',
  async (positionId: number) => {
    await axios.delete(`${API_URL}positions/${positionId}`);
    return positionId;
  }
)
export const searchPositionAsync = createAsyncThunk(
  'positions/search',
  async (text: string) => {
    const response = await axios.get<[]>(`${API_URL}positions/search/${text}`);
    return response.data;
  }
);









export const booksSlice = createSlice({
  name: "positions-state",
  initialState,
  reducers: {

    addPosition: (state, action) => {
      const newPosition: any = action.payload;
      const originList: any = [...state.originList];
      originList.push(newPosition);
      state.positionList = originList;
      // thêm sản phẩm
    },
    removePosition: (state, action) => {
      // xoá sản phẩm
      const { id } = action.payload;
      const originList: any = [...state.originList];
      originList.filter((position: any) => position.id !== id);
      state.positionList = originList;
    },
    updatePosition: (state, action) => {
      // cập nhật sản phẩmupdateProduct: (state, action) => {
      const position = action.payload;
      const originList: any = [...state.originList];

      const index = originList.findIndex((p: any) => p.id === position.id);

      originList[index] = position;
      state.originList = originList;
    },
    resetPositionList: (state) => {
      const originList: any = [...state.originList];
      state.positionList = originList;
    },
    getPositionById(state, action) {
      const tmp = state.positionList.find(
        book => book.id == action.payload
      );
      state.selectedPosition = tmp
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPositonListAsync.fulfilled, (state, action) => {
      state.positionList = action.payload;
      state.originList = action.payload;
    })
      .addCase(createPositionAsync.fulfilled, (state, action) => {
        toast.success("Đã thêm " + action.payload, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(updatePositionAsync.fulfilled, (state, action) => {
        const index = state.positionList.findIndex(item => item.id === action.payload.id);
        state.positionList[index] = action.payload;
        toast.success("Đã cập nhật " + action.payload.id + ' - ' + action.payload.name, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(deletePositionAsync.fulfilled, (state, action) => {
        state.positionList = state.positionList.filter(
          item => item.id !== action.payload
        );
        toast.success(`Đã xóa chức vụ có id ${action.payload}`)
      })
  },
});
export const getpositionList = (state: RootState) => state.position.originList;
export const { resetPositionList,  getPositionById } =
  booksSlice.actions;

export const getPosition = (state: RootState) => state.position.selectedPosition;
export default booksSlice.reducer;
