// bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
import { Position } from "@/models/position";

export interface expenseState {
  expenseList: Position[];
  originList: Position[];
  selectedPosition: any | null
}

const initialState: expenseState = {
  expenseList: [],
  originList: [],
  selectedPosition: null
};
export const getExpenseListAsync = createAsyncThunk("expense/fetchpositions", async () => {
  const response = await axios.get<[]>("http://localhost:5000/expense");
  return response.data;
});

export const createPositionAsync = createAsyncThunk(
  'expense/create',
  async (positionData: any) => {
    const response = await axios.post<any>('http://localhost:5000/expense', positionData);
    console.log(response)
    return response.data.name;
  }
);

export const updatePositionAsync = createAsyncThunk(
  'expense/update',
  async (updatedPosition: any) => {
    const response = await axios.put<any>(`http://localhost:5000/expense/${updatedPosition.id}`, updatedPosition);
    return updatedPosition;
  }
);

export const deletePositionAsync = createAsyncThunk(
  'expense/delete',
  async (positionId: number) => {
    await axios.delete(`http://localhost:5000/expense/${positionId}`);
    return positionId;
  }
)
export const searchPositionAsync = createAsyncThunk(
  'expense/search',
  async (text: string) => {
    const response = await axios.get<[]>(`http://localhost:5000/expense/search/${text}`);
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
      state.expenseList = originList;
      // thêm sản phẩm
    },
    removePosition: (state, action) => {
      // xoá sản phẩm
      const { id } = action.payload;
      const originList: any = [...state.originList];
      originList.filter((position: any) => position.id !== id);
      state.expenseList = originList;
    },
    updatePosition: (state, action) => {
      // cập nhật sản phẩmupdateProduct: (state, action) => {
      const position = action.payload;
      const originList: any = [...state.originList];

      const index = originList.findIndex((p: any) => p.id === position.id);

      originList[index] = position;
      state.originList = originList;
    },
    resetexpenseList: (state) => {
      const originList: any = [...state.originList];
      state.expenseList = originList;
    },
    getPositionById(state, action) {
      const tmp = state.expenseList.find(
        book => book.id == action.payload
      );
      state.selectedPosition = tmp
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExpenseListAsync.fulfilled, (state, action) => {
      state.expenseList = action.payload;
      state.originList = action.payload;
    })
      .addCase(createPositionAsync.fulfilled, (state, action) => {
        toast.success("Đã thêm " + action.payload, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(updatePositionAsync.fulfilled, (state, action) => {
        const index = state.expenseList.findIndex(item => item.id === action.payload.id);
        state.expenseList[index] = action.payload;
        toast.success("Đã cập nhật " + action.payload.id + ' - ' + action.payload.name, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(deletePositionAsync.fulfilled, (state, action) => {
        state.expenseList = state.expenseList.filter(
          item => item.id !== action.payload
        );
        toast.success(`Đã xóa chức vụ có id ${action.payload}`)
      })
  },
});
export const getExpenseList = (state: RootState) => state.expenseSlice.originList;
export const { resetexpenseList,  getPositionById } =
  booksSlice.actions;

export const getPosition = (state: RootState) => state.expenseSlice.selectedPosition;
export default booksSlice.reducer;
