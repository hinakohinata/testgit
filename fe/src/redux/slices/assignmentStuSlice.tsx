import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface assignmentStudent {
    originList: any[];
    assignmentStuList: any[];
    selectedAcc: any | null
}

const initialState: assignmentStudent = {
    originList: [],
    assignmentStuList: [],
    selectedAcc: null
};
export const getAssignmentStuListAsync = createAsyncThunk(
    'assignmentStudent/get-list',
    async () => {
        const response = await axios.get<[]>(API_URL+'assignmentStudent/getByAsmTable');
        return response.data
    }
);

export const createAsmStudentAsync = createAsyncThunk(
    'assignmentStudent/create',
    async (data: any) => {
      const response = await axios.post<any>(API_URL+'assignmentStudent', data);
      console.log(response)
      return response.data.name;
    }
  );

  export const setOffAsmStudentAsync = createAsyncThunk(
    'assignmentStudent/setOffAsm',
    async (data:any) => {
      const response = await axios.post<any>(`${API_URL}assignmentStudent/setOff`, data);
      return response.data;
    }
  );

  export const changeRoomAsmStudentAsync = createAsyncThunk(
    'assignmentStudent/changeRoomAsm',
    async (data:any) => {
      const response = await axios.post<any>(`${API_URL}assignmentStudent/changeRoom`, data);
      return response.data;
    }
  );
export const assignmentStuSlice = createSlice({
    name: "Asm-state",
    initialState,
    reducers: {
        resetassignmentStuList: (state) => {
            const originList: any = [...state.originList];
            state.assignmentStuList = originList;
        },
        getAccById(state, action) {
            const tmp = state.assignmentStuList.find(
                author => author.user_id == action.payload
            );
            state.selectedAcc = tmp
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAssignmentStuListAsync.fulfilled, (state, action) => {
                state.assignmentStuList = action.payload;
                state.originList = action.payload;
            })
    },
})

export const getAssignmentStuList = (state: RootState) => state.assignmentStudent.assignmentStuList;
export const getAcc = (state: RootState) => state.assignmentStudent.selectedAcc;

export const { resetassignmentStuList, getAccById } = assignmentStuSlice.actions
export default assignmentStuSlice.reducer