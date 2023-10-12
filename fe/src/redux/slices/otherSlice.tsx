import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface accountState {
    originList: any[];
    accList: any[];
    selectedAcc: any | null
}

const initialState: accountState = {
    originList: [],
    accList: [],
    selectedAcc: null
};


export const getACCforAddAsm1to6ListAsync = createAsyncThunk('other/get-list', async () => {
    const response = await axios.get<[]>(API_URL+'other/getforAddAsm1to6');
    return response.data
});

export const getACCforAddAsm7ListAsync = createAsyncThunk('other/get-list', async () => {
    const response = await axios.get<[]>(API_URL+'other/getforAddAsm7');
    return response.data
});

export const getACCforAddAsmStudentAsync = createAsyncThunk('other/get-list', async () => {
    const response = await axios.get<[]>(API_URL+'other/getforAddAsmStudent');
    return response.data
});

export const getStudentForAddFeeCollectionAsync = createAsyncThunk("other/getStudentForAddFeeCollection", async (data:any) => {
    const response = await axios.post<[]>(`${API_URL}other/getStudentForAddFeeCollection`,data);
    return response.data;
  });


  

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
                    state.accList = notFilterList.filter((e) => e.role1 == "1")
                    break;
                case 2:
                    state.accList = notFilterList.filter((e) => e.role2 == "1")
                    break;
                case 3:
                    state.accList = notFilterList.filter((e) => e.role3 == "1")
                    break;
                case 4:
                    state.accList = notFilterList.filter((e) => e.role4 == "1")
                    break;
                case 5:
                    state.accList = notFilterList.filter((e) => e.role5 == "1")
                    break;
                case 6:
                    state.accList = notFilterList.filter((e) => e.role6 == "1")
                    break;
                case 7:
                    state.accList = notFilterList.filter((e) => e.role7 == "1")
                    break;
                case 8:
                    state.accList = notFilterList.filter((e) => e.role8 == "1")
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
              .addCase(getStudentForAddFeeCollectionAsync.fulfilled, (state, action) => {                  
                state.accList = action.payload;
              })
            .addMatcher(
                (action) => [
                  getACCforAddAsm1to6ListAsync.fulfilled.type,
                  getACCforAddAsm7ListAsync.fulfilled.type,
                  getACCforAddAsmStudentAsync.fulfilled.type
                ].includes(action.type),
                (state, action) => {
                  state.accList = action.payload;
                }
              )
    },
})

export const getaccList = (state: RootState) => state.otherState.accList;
export const getAcc = (state: RootState) => state.otherState.selectedAcc;

export const { resetAccList, filterAccByrole, getAccById } = AccSlice.actions
export default AccSlice.reducer