import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { toast } from 'react-toastify';
import axios from "axios";
import bcrypt from 'bcryptjs';

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

export const login = createAsyncThunk(
  'author/create',
  async (param: any) => {
    console.log(param)
    const { username, password } = param;
    const saltRounds = 10;

    const response = await axios.post<any>('http://localhost:5000/user/login', {
      username,
      password,
    });
    if (response.status === 200) {
      const token = response.data.token;
      // Sau khi đăng nhập thành công
      const result = response.data;// kết quả truy vấn ở trên

      const user = result;
      console.log(user,response.data.error)
      if(response.data.error!=null){
      
      toast.error(response.data.error, {
        position: "top-right",
        autoClose: 5000,
      });
      return null;
    }
      const hashedUser = await bcrypt.hash(username, saltRounds);
      sessionStorage.setItem("user_id", hashedUser);


      if (user.role1.data[0] === 1) {
        const role = "1";
        sessionStorage.setItem("role", role);
      }

      if (user.role2.data[0] === 1) {
        sessionStorage.setItem("role", '2');
      }
      if (user.role3.data[0] === 1) {
        sessionStorage.setItem("role", '3');
      }

      if (user.role4.data[0] === 1) {

        sessionStorage.setItem("role", '4');
      }
      if (user.role5.data[0] === 1) {

        sessionStorage.setItem("role", '5');
      }

      if (user.role6.data[0] === 1) {

        sessionStorage.setItem("role", '6');
      }

      toast.success("Đăng nhập thành công ", {
        position: "top-right",
        autoClose: 5000,
      });

    }
    return null;
  }
);






const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetch: (state) => {
      state.isLoggedIn = false;
      state.username = sessionStorage.getItem("user_id");
      state.userrole = sessionStorage.getItem("role");
      if (state.username != "")
        state.isLoggedIn = true;
    },
    // login: (state, action) => {
    //   const {username,password}=action.payload;
    //   const response = await axios.post('http://localhost:5000/user/login', {
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
      sessionStorage.setItem("user_id", "");
      sessionStorage.setItem("role", "");
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
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.username = sessionStorage.getItem("user_id");
        state.userrole = sessionStorage.getItem("role");
      })
  }
});

export const { logout, setUser, fetch } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getUsername = (state: RootState) => state.user.username;
export const getRole = (state: RootState) => state.user.userrole;




// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import { toast } from 'react-toastify';
// import axios from "axios";
// import bcrypt from 'bcryptjs';

// export interface userState {
//   isLoggedIn: any,
//   username: any,
//   userrole: any
// };

// const initialState: userState = {
//   isLoggedIn: false,
//   username: null,
//   userrole: null
// };

// export const login = createAsyncThunk(
//   'author/create',
//   async (param: any) => {
//     console.log(param)
//     const { username, password } = param;
//     const saltRounds = 10;

//     const response = await axios.post<any>('http://localhost:5000/user/login', {
//       username,
//       password,
//     });
//     if (response.status === 200) {
//       const token = response.data.token;
//       // Sau khi đăng nhập thành công
//       const result = response.data;// kết quả truy vấn ở trên

//       const user = result;
//       console.log(user,response.data.error)
//       if(response.data.error!=null){
      
//       toast.error(response.data.error, {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       return null;
//     }
//       const hashedUser = await bcrypt.hash(username, saltRounds);
//       sessionStorage.setItem("user_id", hashedUser);


//       if (user.role1.data[0] === 1) {
//         const role = "1";
//         sessionStorage.setItem("role", role);
//       }

//       if (user.role2.data[0] === 1) {
//         sessionStorage.setItem("role", '2');
//       }
//       if (user.role3.data[0] === 1) {
//         sessionStorage.setItem("role", '3');
//       }

//       if (user.role4.data[0] === 1) {

//         sessionStorage.setItem("role", '4');
//       }
//       if (user.role5.data[0] === 1) {

//         sessionStorage.setItem("role", '5');
//       }

//       if (user.role6.data[0] === 1) {

//         sessionStorage.setItem("role", '6');
//       }

//       toast.success("Đăng nhập thành công ", {
//         position: "top-right",
//         autoClose: 5000,
//       });

//     }
//     return null;
//   }
// );





// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     fetch: (state) => {
//       state.isLoggedIn = false;
//       state.username = sessionStorage.getItem("user_id");
//       state.userrole = sessionStorage.getItem("role");
//       if (state.username != "")
//         state.isLoggedIn = true;
//     },
//     // login: (state, action) => {
//     //   const {username,password}=action.payload;
//     //   const response = await axios.post('http://localhost:5000/user/login', {
//     //     username,
//     //     password,
//     //   });
//     //   if (response.status === 200) {
//     //     const token = response.data.token;
//     //     // Sau khi đăng nhập thành công
//     //     const result = response.data;// kết quả truy vấn ở trên

//     //     const user = result[0];

//     //     const hashedUser = await bcrypt.hash(username, saltRounds);
//     //     sessionStorage.setItem("user_id", hashedUser);
//     //   }
//     //   state.isLoggedIn = true;
//     //   state.username = action.payload;
//     //   state.userrole = null;
//     // },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.username = null;
//       sessionStorage.setItem("user_id", "");
//       sessionStorage.setItem("role", "");
//       toast.success("Đã đăng xuất thành công", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     },
//     setUser: (state, action) => {
//       const { username, role } = action.payload;
//       state.username = username;
//       state.isLoggedIn = true;
//       state.userrole = role;
//       // alert("helloooooooooo"+state.username+state.isLoggedIn)
//       toast.success("Đã đăng nhập thành công " + username, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(login.fulfilled, (state) => {
//         state.isLoggedIn = true;
//         state.username = sessionStorage.getItem("user_id");
//         state.userrole = sessionStorage.getItem("role");
//       })
//   }
// });

// export const { logout, setUser, fetch } = userSlice.actions;
// export default userSlice.reducer;

// // Selectors
// export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
// export const getUsername = (state: RootState) => state.user.username;
// export const getRole = (state: RootState) => state.user.userrole;
