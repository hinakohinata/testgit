import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define room state
export interface RoomState {
    roomList: any[];
    selectedRoom: any | null;
    classGroups: Record<number, string>;
}

const initialState: RoomState = {
    roomList: [],
    selectedRoom: null,
    classGroups: {} 
};

export const getRoomListAsync = createAsyncThunk(
    'room/get-room-list',
    async () => {
        const response = await axios.get<[]>(API_URL+'room');
        return response.data;
    }
);
export const getClassesAsync = createAsyncThunk(
    'room/get-classes',
    async () => {
        const response = await axios.get<[]>(API_URL+'classGroup');
        return response.data;
    }
);

// You may want to adjust these to match the room attributes and your backend structure
export const createRoomAsync = createAsyncThunk(
    'room/create',
    async (roomData: any) => {
        console.log(roomData)
        const response = await axios.post<any>(API_URL+'room', roomData);
        console.log(response)
        return response.data.name;
    }
);


export const updateRoomAsync = createAsyncThunk(
    'room/update',
    async (updatedRoom: any) => {
        const response = await axios.put<any>(`${API_URL}room/${updatedRoom.room_id}`, updatedRoom);
        return updatedRoom;
    }
);



export const roomSlice = createSlice({
    name: "room-state",
    initialState,
    reducers: {
        getRoomById(state, action) {
            const tmp = state.roomList.find(room => room.room_id === action.payload);
            state.selectedRoom = tmp;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getRoomListAsync.fulfilled, (state, action) => {
            state.roomList = action.payload;
        })
        // Handle other fulfilled cases similarly
        .addCase(createRoomAsync.fulfilled, (state, action) => {
            // Update toast to match rooms
            toast.success("Đã thêm phòng thành công", {
                position: "top-right",
                autoClose: 5000,
            });
        })
        .addCase(updateRoomAsync.fulfilled, (state, action) => {
            const index = state.roomList.findIndex(item => item.room_id == action.payload.room_id);
            if (index !== -1) {
                state.roomList[index] = action.payload;
            }
            toast.success("Đã cập nhật thành công ", {
                position: "top-right",
                autoClose: 5000,
            });
        })
       
        .addCase(getClassesAsync.fulfilled, (state, action) => {
            console.log('Payload:', action.payload);
            action.payload.forEach((classGroup: any) => {
                (classGroup.class_group_id && classGroup.name) 
                    state.classGroups[classGroup.class_group_id] = classGroup.name;
                
            });
          
         })
         
         
    },
});

export const getRoomList = (state: RootState) => state.roomState.roomList;
export const getRoom = (state: RootState) => state.roomState.selectedRoom;
export const { getRoomById } = roomSlice.actions;
export default roomSlice.reducer;