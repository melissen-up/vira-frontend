import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    username: "",
    password: "",
    realname: "",
    bio: "",
    image: ""
  },
  reducers: {
    setCurrentUser(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.realname = action.payload.realname;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
    },
    
  }
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer