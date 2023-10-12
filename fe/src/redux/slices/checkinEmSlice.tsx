
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { toast } from 'react-toastify';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface checkinEmState {
  CheckinEmList: any[];
  originList: any[];
  selectedPosition: any | null
}

const initialState: checkinEmState = {
  CheckinEmList: [],
  originList: [],
  selectedPosition: null
};

export const getCheckinEmListAsync = createAsyncThunk("checkin/fetchcheckin", async () => {
  const response = await axios.get<[]>(API_URL+"checkin");
  return response.data;
});

export const CreateCheckinEmListAsync = createAsyncThunk("checkin/fetchCreateCheckin", async (data: any[]) => {
  const response = await axios.post<any>(API_URL+'checkin/createByDate', { data });
  console.log("list", response.data)
  return response.data;
});

export const getCheckinBydateAsync = createAsyncThunk('checkin/getCheckinByDate', async (date: any) => {
  const response = await axios.post<any>(API_URL+'checkin/getByDate', { date });
  console.log("list", date, response.data)
  return response.data;
}
);

export const createCheckinEmAsync = createAsyncThunk(
  'checkin/create',
  async (positionData: any) => {
    const response = await axios.post<any>(API_URL+'checkin/createByDate', positionData);
    console.log(response)
    return response.data.name;
  }
);

export const updatePositionAsync = createAsyncThunk(
  'checkin/update',
  async (updatedPosition: any) => {
    const response = await axios.put<any>(`${API_URL}checkin/${updatedPosition.id}`, updatedPosition);
    return updatedPosition;
  }
);

export const setOffCheckinAsync = createAsyncThunk(
  'checkin/setOffCheckin',
  async (data: any) => {
    const response = await axios.post<any>(`${API_URL}checkin/setOff`, data);
    return response.data;
  }
);

export const setOnCheckinAsync = createAsyncThunk(
  'checkin/setOnCheckin',
  async (id: any) => {
    const response = await axios.post<any>(`${API_URL}checkin/setOn/${id}`);
    return id;
  }
);

export const deletePositionAsync = createAsyncThunk(
  'checkin/delete',
  async (positionId: number) => {
    await axios.delete(`${API_URL}checkin/${positionId}`);
    return positionId;
  }
)
export const searchPositionAsync = createAsyncThunk(
  'checkin/search',
  async (text: string) => {
    const response = await axios.get<[]>(`${API_URL}checkin/search/${text}`);
    return response.data;
  }
);









export const checkinEmState = createSlice({
  name: "checkin-state",
  initialState,
  reducers: {
    addPosition: (state, action) => {
      const newPosition: any = action.payload;
      const originList: any = [...state.originList];
      originList.push(newPosition);
      state.CheckinEmList = originList;
      // thêm sản phẩm
    },
    removePosition: (state, action) => {
      // xoá sản phẩm
      const { id } = action.payload;
      const originList: any = [...state.originList];
      originList.filter((position: any) => position.id !== id);
      state.CheckinEmList = originList;
    },
    updatePosition: (state, action) => {
      // cập nhật sản phẩmupdateProduct: (state, action) => {
      const position = action.payload;
      const originList: any = [...state.originList];

      const index = originList.findIndex((p: any) => p.id === position.id);

      originList[index] = position;
      state.originList = originList;
    },
    resetCheckinEmList: (state) => {
      const originList: any = [...state.originList];
      state.CheckinEmList = originList;
    },
    getPositionById(state, action) {
      const tmp = state.CheckinEmList.find(
        book => book.id == action.payload
      );
      state.selectedPosition = tmp
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCheckinEmListAsync.fulfilled, (state, action) => {
      state.CheckinEmList = action.payload;
      state.originList = action.payload;
    })
      .addCase(getCheckinBydateAsync.fulfilled, (state, action) => {
        state.CheckinEmList = action.payload;
      })
      .addCase(setOffCheckinAsync.fulfilled, (state, action) => {
        state.CheckinEmList = action.payload;
        toast.success("Đã cập nhật ", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(setOnCheckinAsync.fulfilled, (state, action) => {
        state.CheckinEmList = action.payload;
        toast.success("Đã cập nhật ", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(createCheckinEmAsync.fulfilled, (state, action) => {
        toast.success("Đã tạo danh sách" + action.payload, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(updatePositionAsync.fulfilled, (state, action) => {
        const index = state.CheckinEmList.findIndex(item => item.id === action.payload.id);
        state.CheckinEmList[index] = action.payload;
        toast.success("Đã cập nhật " + action.payload.id + ' - ' + action.payload.name, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .addCase(deletePositionAsync.fulfilled, (state, action) => {
        state.CheckinEmList = state.CheckinEmList.filter(
          item => item.id !== action.payload
        );
        toast.success(`Đã xóa chức vụ có id ${action.payload}`)
      })
  },
});
export const getCheckinEmList = (state: RootState) => state.checkinEm.CheckinEmList;
export const { resetCheckinEmList, getPositionById } =
  checkinEmState.actions;

export const getPosition = (state: RootState) => state.checkinEm.selectedPosition;
export default checkinEmState.reducer;
