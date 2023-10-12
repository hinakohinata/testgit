
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface evaluationState {
  evaluationList: any[];
  originList: any[];
  selectedPosition: any | null
}

const initialState: evaluationState = {
  evaluationList: [],
  originList: [],
  selectedPosition: null
};

export const getevaluationListAsync = createAsyncThunk("evaluation/fetchcheckin", async () => {
  const response = await axios.get<[]>(API_URL+"evaluation");
  return response.data;
});

export const getAttendanceBydateAsync = createAsyncThunk( 'evaluation/getCheckinByDate',async (date: any) => {
    const response = await axios.post<any>(API_URL+'evaluation/getByDate', {date});
    console.log("list",date,response.data)
    return response.data;
  }
);


export const updatePositionAsync = createAsyncThunk(
  'evaluation/update',
  async (updatedPosition: any) => {
    const response = await axios.put<any>(`${API_URL}evaluation/${updatedPosition.id}`, updatedPosition);
    return updatedPosition;
  }
);

export const deletePositionAsync = createAsyncThunk(
  'evaluation/delete',
  async (positionId: number) => {
    await axios.delete(`${API_URL}evaluation/${positionId}`);
    return positionId;
  }
)
export const searchPositionAsync = createAsyncThunk(
  'evaluation/search',
  async (text: string) => {
    const response = await axios.get<[]>(`${API_URL}evaluation/search/${text}`);
    return response.data;
  }
);









export const evaluationState = createSlice({
  name: "checkin-state",
  initialState,
  reducers: {
    addPosition: (state, action) => {
      const newPosition: any = action.payload;
      const originList: any = [...state.originList];
      originList.push(newPosition);
      state.evaluationList = originList;
      // thêm sản phẩm
    },
    removePosition: (state, action) => {
      // xoá sản phẩm
      const { id } = action.payload;
      const originList: any = [...state.originList];
      originList.filter((position: any) => position.id !== id);
      state.evaluationList = originList;
    },
    updatePosition: (state, action) => {
      // cập nhật sản phẩmupdateProduct: (state, action) => {
      const position = action.payload;
      const originList: any = [...state.originList];

      const index = originList.findIndex((p: any) => p.id === position.id);

      originList[index] = position;
      state.originList = originList;
    },
    resetevaluationList: (state) => {
      const originList: any = [...state.originList];
      state.evaluationList = originList;
    },
    getPositionById(state, action) {
      const tmp = state.evaluationList.find(
        book => book.id == action.payload
      );
      state.selectedPosition = tmp
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getevaluationListAsync.fulfilled, (state, action) => {
      state.evaluationList = action.payload;
      state.originList = action.payload;
    })
    builder.addCase(getAttendanceBydateAsync.fulfilled, (state, action) => {
      state.evaluationList = action.payload;
    })
      .addCase(updatePositionAsync.fulfilled, (state, action) => {
        const index = state.evaluationList.findIndex(item => item.id === action.payload.id);
        state.evaluationList[index] = action.payload;
        toast.success("Đã cập nhật " + action.payload.id + ' - ' + action.payload.name, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(deletePositionAsync.fulfilled, (state, action) => {
        state.evaluationList = state.evaluationList.filter(
          item => item.id !== action.payload
        );
        toast.success(`Đã xóa chức vụ có id ${action.payload}`)
      })
  },
});
export const getevaluationList = (state: RootState) => state.evaluation.evaluationList;
export const { resetevaluationList,  getPositionById } =
evaluationState.actions;

export const getPosition = (state: RootState) => state.evaluation.selectedPosition;
export default evaluationState.reducer;
