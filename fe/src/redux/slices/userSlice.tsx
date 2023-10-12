import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { toast } from 'react-toastify';
import axios from "axios";
import bcrypt from 'bcryptjs';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface userState {
  isLoggedIn: any,
  username: any,
  userrole: any
};

const initialState: userState = {
  isLoggedIn: false,
  username: null,
  userrole: null
};

export const login = createAsyncThunk('author/create', async (param: any) => {
  console.log(param)
  const { username, password } = param;
  // Call API
  const response = await axios.post<any>(API_URL+'user/login', { username, password });

  return response.data;
})
// export const login = createAsyncThunk('author/create', async (param: any) => {
//   console.log(param)
//   const { username, password } = param;
//   const saltRounds = 10;
//   const response = await axios.post<any>(API_URL+'user/login', { username, password });
//   let role = "1";

//   if (response.status === 200) {
//     // Sau khi đăng nhập thành công
//     const result = response.data;// kết quả truy vấn ở trên

//     const user = result;
//     console.log(user, response.data.error)
//     if (response.data.error != null) {
//       return response.data.error;
//     }
//     const hashedUser = await bcrypt.hash(username, saltRounds);
//     sessionStorage.setItem("user_id", hashedUser);


//     if (user.role1.data[0] === 1) {
//       // sessionStorage.setItem("role", role);
//       role = "1";
//     }

//     if (user.role2.data[0] === 1) {
//       // sessionStorage.setItem("role", '2');
//       role = "2";
//     }
//     if (user.role3.data[0] === 1) {
//       // sessionStorage.setItem("role", '3');
//       role = "3";
//     }

//     if (user.role4.data[0] === 1) {
//       role = "4";

//       // sessionStorage.setItem("role", '4');
//     }
//     if (user.role5.data[0] === 1) {
//       role = "5";

//       // sessionStorage.setItem("role", '5');
//     }

//     if (user.role6.data[0] === 1) {
//       role = "6";

//       // sessionStorage.setItem("role", '6');
//     }

//     toast.success("Đăng nhập thành công ", {
//       position: "top-right",
//       autoClose: 5000,
//     });

//   }
//   return { username: username, role: role };
// }
// );






const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // fetch: (state) => {
    //   state.isLoggedIn = false;
    //   // state.username = sessionStorage.getItem("user_id");
    //   // state.userrole = sessionStorage.getItem("role");
    //   if (state.username != "")
    //     state.isLoggedIn = true;
    // },
    // login: (state, action) => {
    //   const {username,password}=action.payload;
    //   const response = await axios.post(API_URL+'user/login', {
    //     username,
    //     password,
    //   });
    //   if (response.status === 200) {
    //     const token = response.data.token;
    //     // Sau khi đăng nhập thành công
    //     const result = response.data;// kết quả truy vấn ở trên

    //     const user = result[0];

    //     const hashedUser = await bcrypt.hash(username, saltRounds);
    //     sessionStorage.setItem("user_id", hashedUser);
    //   }
    //   state.isLoggedIn = true;
    //   state.username = action.payload;
    //   state.userrole = null;
    // },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.userrole = null;
      // sessionStorage.setItem("user_id", "");
      // sessionStorage.setItem("role", "");
      toast.success("Đã đăng xuất thành công", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    setUser: (state, action) => {
      const { username, role } = action.payload;
      state.username = username;
      state.isLoggedIn = true;
      state.userrole = role;
      // alert("helloooooooooo"+state.username+state.isLoggedIn)
      toast.success("Đã đăng nhập thành công " + username, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.error) {
          // Login thất bại
          toast.error(action.payload.error, {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          console.log(action.payload)
          toast.success("Đăng nhập thành công" , {
            position: "top-right",
            autoClose: 5000,
          });
          let role;
          const user = action.payload;
          if (user.role1 == 1) {
            role = "1";
          }
          if (user.role2 == 1) {
            role = "2";
          }
          if (user.role3 == 1) {
            role = "3";
          }

          if (user.role4 == 1) {
            role = "4";

          }
          if (user.role5 == 1) {
            role = "5";

          }

          if (user.role6 == 1) {
            role = "6";

          }

          state.isLoggedIn = true;
          state.username = user.user_id;
          state.userrole = role;
          console.log("set ",state.isLoggedIn,state.username,state.userrole)
        }
        // toast.error(action.payload+action.payload.error, {
        //   position: "top-right",
        //   autoClose: 5000,
        // });
      })
  }
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getUsername = (state: RootState) => state.user.username;
export const getRole = (state: RootState) => state.user.userrole;


