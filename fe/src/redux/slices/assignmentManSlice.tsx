import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface assignmentMan {
    originList: any[];
    assignmentManList: any[];
    selectedAcc: any | null
}

const initialState: assignmentMan = {
    originList: [],
    assignmentManList: [],
    selectedAcc: null
};

export const getAssignmentManListAsync = createAsyncThunk('asm/get-list', async () => {
    const response = await axios.get<[]>(API_URL+'assignment/getByAsmTable');
    return response.data
}
);

export const getIn4ForcheckinAsync = createAsyncThunk("checkin/getIn4Forcheckin", async () => {
    const response = await axios.get<[]>(API_URL+"checkin/getIn4Forcheckin");
    return response.data;
});

export const createAsmAsync = createAsyncThunk(
    'asm/create',
    async (data: any) => {
      const response = await axios.post<any>(API_URL+'assignment', data);
      console.log(response)
      return response.data.name;
    }
  );

  export const setOffAsmAsync = createAsyncThunk(
    'asm/setOffAsm',
    async (data:any) => {
      const response = await axios.post<any>(`${API_URL}assignment/setOff`, data);
      return response.data;
    }
  );

  export const changeRoomAsmAsync = createAsyncThunk(
    'asm/changeRoomAsm',
    async (data:any) => {
      const response = await axios.post<any>(`${API_URL}assignment/changeRoom`, data);
      return response.data;
    }
  );
export const assignmentManSlice = createSlice({
    name: "Asm-state",
    initialState,
    reducers: {
        resetassignmentManList: (state) => {
            const originList: any = [...state.originList];
            state.assignmentManList = originList;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAssignmentManListAsync.fulfilled, (state, action) => {
                state.assignmentManList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getIn4ForcheckinAsync.fulfilled, (state, action) => {
                state.assignmentManList = action.payload;
            })
            .addCase(createAsmAsync.fulfilled, (state, action) => {
                state.assignmentManList = action.payload;
                toast.success("Đã cập nhật", {
                    position: "top-right",
                    autoClose: 5000,
                });
            })
            .addCase(setOffAsmAsync.fulfilled, (state, action) => {
              state.assignmentManList = action.payload;
              toast.success("Đã cập nhật ", {
                position: "top-right",
                autoClose: 5000,
              });
            })
            .addCase(changeRoomAsmAsync.fulfilled, (state, action) => {
              state.assignmentManList = action.payload;
              toast.success("Đã cập nhật ", {
                position: "top-right",
                autoClose: 5000,
              });
            })
              
    },
})

export const getAssignmentManList = (state: RootState) => state.assignmentMan.assignmentManList;

export const { resetassignmentManList } = assignmentManSlice.actions
export default assignmentManSlice.reducer