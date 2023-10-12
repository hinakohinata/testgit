
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface attendanceState {
  attendanceList: any[];
  originList: any[];
  selectedPosition: any | null
}

const initialState: attendanceState = {
  attendanceList: [],
  originList: [],
  selectedPosition: null
};

export const getattendanceListAsync = createAsyncThunk("attendance/fetchcheckin", async () => {
  const response = await axios.get<[]>(API_URL+"attendance");
  return response.data;
});

export const getAttendanceBydateAsync = createAsyncThunk( 'attendance/getCheckinByDate',async (date: any) => {
    const response = await axios.post<any>(API_URL+'attendance/getByDate', {date});
    console.log("list",date,response.data)
    return response.data;
  }
);

export const createAttendanceBydateAsync = createAsyncThunk(
  'attendance/create',
  async (positionData: any) => {
    const response = await axios.post<any>(API_URL+'attendance/createByDate', positionData);
    console.log(response)
    return response.data.name;
  } 
);

export const updatePositionAsync = createAsyncThunk(
  'attendance/update',
  async (updatedPosition: any) => {
    const response = await axios.put<any>(`${API_URL}attendance/${updatedPosition.id}`, updatedPosition);
    return updatedPosition;
  }
);

export const deletePositionAsync = createAsyncThunk(
  'attendance/delete',
  async (positionId: number) => {
    await axios.delete(`${API_URL}attendance/${positionId}`);
    return positionId;
  }
)
export const searchPositionAsync = createAsyncThunk(
  'attendance/search',
  async (text: string) => {
    const response = await axios.get<[]>(`${API_URL}attendance/search/${text}`);
    return response.data;
  }
);









export const attendanceState = createSlice({
  name: "checkin-state",
  initialState,
  reducers: {
    addPosition: (state, action) => {
      const newPosition: any = action.payload;
      const originList: any = [...state.originList];
      originList.push(newPosition);
      state.attendanceList = originList;
      // thêm sản phẩm
    },
    removePosition: (state, action) => {
      // xoá sản phẩm
      const { id } = action.payload;
      const originList: any = [...state.originList];
      originList.filter((position: any) => position.id !== id);
      state.attendanceList = originList;
    },
    updatePosition: (state, action) => {
      // cập nhật sản phẩmupdateProduct: (state, action) => {
      const position = action.payload;
      const originList: any = [...state.originList];

      const index = originList.findIndex((p: any) => p.id === position.id);

      originList[index] = position;
      state.originList = originList;
    },
    resetattendanceList: (state) => {
      const originList: any = [...state.originList];
      state.attendanceList = originList;
    },
    getPositionById(state, action) {
      const tmp = state.attendanceList.find(
        book => book.id == action.payload
      );
      state.selectedPosition = tmp
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getattendanceListAsync.fulfilled, (state, action) => {
      state.attendanceList = action.payload;
      state.originList = action.payload;
    })
   .addCase(getAttendanceBydateAsync.fulfilled, (state, action) => {
      state.attendanceList = action.payload;
    })
    .addCase(createAttendanceBydateAsync.fulfilled, (state, action) => {
      toast.success("Đã tạo danh sách", {
        position: "top-right",
        autoClose: 5000,
      });
    })
      .addCase(updatePositionAsync.fulfilled, (state, action) => {
        const index = state.attendanceList.findIndex(item => item.id === action.payload.id);
        state.attendanceList[index] = action.payload;
        toast.success("Đã cập nhật " + action.payload.id + ' - ' + action.payload.name, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(deletePositionAsync.fulfilled, (state, action) => {
        state.attendanceList = state.attendanceList.filter(
          item => item.id !== action.payload
        );
        toast.success(`Đã xóa chức vụ có id ${action.payload}`)
      })
  },
});
export const getAttendanceList = (state: RootState) => state.attendance.attendanceList;
export const { resetattendanceList,  getPositionById } =
attendanceState.actions;

export const getPosition = (state: RootState) => state.attendance.selectedPosition;
export default attendanceState.reducer;
