// bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
import { Position } from "@/models/position";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface expenseState {
  expenseList: any[];
  originList: any[];
  typeName: Record<number, string>;
  selectedExpense: any | null
}

const initialState: expenseState = {
  expenseList: [],
  originList: [],
  typeName: {},
  selectedExpense: null
};
export const getExpenseListAsync = createAsyncThunk("expense/fetchpositions", async () => {
  const response = await axios.get<[]>(API_URL+"expense/getForTable");
  return response.data;
});

export const createExpenseAsync = createAsyncThunk(
  'expense/create',
  async (expenseData: any) => {
    const response = await axios.post<any>(API_URL+'expense', expenseData);
    console.log(response)
    return response.data.name;
  }
);
export const getTypeNameAsync = createAsyncThunk(
  'expense/get-typeName',
  async () => {
    const response = await axios.get<[]>(API_URL+'expense/typeName');
    return response.data;
  }
);
export const updateExpenseAsync = createAsyncThunk(
  'expense/update',
  async (updatedExpense: any) => {
    const response = await axios.put<any>(`${API_URL}expense/${updatedExpense.id}`, updatedExpense);
    return updatedExpense;
  }
);
export const searchExpenseAsync = createAsyncThunk(
  'expense/search',
  async (date: string) => {
    const response = await axios.get<[]>(`${API_URL}expense/date/${date}`);
    console.log("Redux Search Results:", response.data);
    return response.data;
  }
);










export const expenseSlice = createSlice({
  name: "expense-state",
  initialState,
  reducers: {

    getExpenseById(state, action) {
      const tmp = state.expenseList.find(
        book => book.id == action.payload
      );
      state.selectedExpense = tmp
    },
    resetExpenseList: (state) => {
      state.expenseList = [...state.originList];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExpenseListAsync.fulfilled, (state, action) => {
      state.expenseList = action.payload;
      state.originList = action.payload;
    })
    .addCase(createExpenseAsync.fulfilled, (state, action) => {
      toast.success("Đã thêm thành công " , {
        position: "top-right",
        autoClose: 5000,
      });
    })
    .addCase(updateExpenseAsync.fulfilled, (state, action) => {
      const index = state.expenseList.findIndex(item => item.id === action.payload.id);
      state.expenseList[index] = action.payload;
      toast.success("Đã cập nhật " + action.payload.id , {
        position: "top-right",
        autoClose: 5000,
      });
    })
    .addCase(getTypeNameAsync.fulfilled, (state, action) => {
      action.payload.forEach((typeName: any) => {
        if (typeName.id && typeName.name && typeName.id) {
          state.typeName[typeName.id] = typeName.name;
        }
      });
    })
    .addCase(searchExpenseAsync.fulfilled, (state, action) => {
      state.expenseList = action.payload;
    })

  },
});
export const getExpenseList = (state: RootState) => state.expenseSlice.expenseList;
export const { resetExpenseList, getExpenseById } = expenseSlice.actions;


export const getExpense = (state: RootState) => state.expenseSlice.selectedExpense;
export default expenseSlice.reducer;
