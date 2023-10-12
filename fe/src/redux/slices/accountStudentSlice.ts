import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface accountStudentState {
    originList: any[];
    accList: any[];
    selectedAcc: any | null
}

const initialState: accountStudentState = {
    originList: [],
    accList: [],
    selectedAcc: null
};

export const getStudentListAsync = createAsyncThunk(
    'Acc/get-student-list',
    async () => {
        const response = await axios.post<[]>(API_URL+'user/getAll');
        return response.data
    }
);
export const getAllStudentListAsync = createAsyncThunk(
    'Acc/get-all-student-list',
    async () => {
        const response = await axios.get<[]>(API_URL+'student/getListStudent');
        return response.data
    }
);
export const getStudentListByRoleAsync = createAsyncThunk(
    'Acc/get-student-list-by-Role',
    async (role: any) => {
        const response = await axios.post<[]>(`${API_URL}user/getAllByRole/${role}`);
        return response.data
    }
);

export const createAccAsync = createAsyncThunk(
    'acc/create',
    async (accData: any) => {
        console.log(accData)
        const response = await axios.post<any>(API_URL+'user', accData);
        console.log(response)
        return response.data.name;
    }
);
export const updateInfAccAsync = createAsyncThunk(
    'user/update1',
    async (updatedAcc: any) => {
        const response = await axios.put<any>(`${API_URL}user/updateInfAccById/${updatedAcc.user_id}`, updatedAcc);
        return updatedAcc;
    }
);
export const disableAccAsync = createAsyncThunk(
    'user/disable',
    async (userID: any) => {
        const response = await axios.put<any>(`${API_URL}user/disableAccById/${userID}`);
        return userID;
    }
);
export const searchAccrAsync = createAsyncThunk(
    'user/search',
    async (text: string) => {
        const response = await axios.post<[]>(`${API_URL}user/search/${text}`);
        return response.data
    }
)




export const AccSlice = createSlice({
    name: "Acc-state",
    initialState,
    reducers: {
        resetAccList: (state) => {
            const originList: any = [...state.originList];
            state.accList = originList;
        },
        filterAccByrole: (state, action) => {
            const notFilterList = [...state.originList];
            // const [filterList,setList]=useState<any[]>([])
            console.log(action.payload)
            switch (action.payload) {
                case 1:
                    state.accList = notFilterList.filter((e) => e.role1.data[0] == "1")
                    break;
                case 2:
                    state.accList = notFilterList.filter((e) => e.role2.data[0] == "1")
                    break;
                case 3:
                    state.accList = notFilterList.filter((e) => e.role3.data[0] == "1")
                    break;
                case 4:
                    state.accList = notFilterList.filter((e) => e.role4.data[0] == "1")
                    break;
                case 5:
                    state.accList = notFilterList.filter((e) => e.role5.data[0] == "1")
                    break;
                case 6:
                    state.accList = notFilterList.filter((e) => e.role6.data[0] == "1")
                    break;
                case 7:
                    state.accList = notFilterList.filter((e) => e.role7.data[0] == "1")
                    break;
                case 8:
                    state.accList = notFilterList.filter((e) => e.role8.data[0] == "1")
                    break;

                default:
                    break;
            }
            // state.accList = filterList;
        },
        getAccById(state, action) {
            const tmp = state.accList.find(
                author => author.user_id == action.payload
            );
            state.selectedAcc = tmp
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getStudentListAsync.fulfilled, (state, action) => {
                state.accList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getAllStudentListAsync.fulfilled, (state, action) => {
                state.accList = action.payload;
                // state.originList = action.payload;
            })
            .addCase(searchAccrAsync.fulfilled, (state, action) => {
                state.accList = action.payload;
            })
            .addCase(getStudentListByRoleAsync.fulfilled, (state, action) => {
                state.originList = action.payload;
            })
            .addCase(updateInfAccAsync.fulfilled, (state, action) => {
                const index = state.accList.findIndex(item => item.id === action.payload.userId);
                state.accList[index] = action.payload;
                toast.success("Đã cập nhật" + action.payload.name + ' - ' + action.payload.name, {
                    position: "top-right",
                    autoClose: 5000,
                });
            })
            .addCase(disableAccAsync.fulfilled, (state, action) => {
                const index = state.accList.findIndex(item => item.id === action.payload.userId);
                state.accList[index] = action.payload;
                toast.success("Đã cập nhật", {
                    position: "top-right",
                    autoClose: 5000,
                });
            })
    },
})

export const getStudentList = (state: RootState) => state.accountStudentState.accList;
export const getStudent = (state: RootState) => state.accountStudentState.selectedAcc;

export const { resetAccList, filterAccByrole, getAccById } = AccSlice.actions
export default AccSlice.reducer