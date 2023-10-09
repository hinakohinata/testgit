
// import  bookSlice  from './slices/bookSlice'
// import authorReducer from './author-reducer/authorSlide'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import accountSlice from './slices/accountSlice';
import positionSlice from './slices/positionSlice';
import checkinEmState from './slices/checkinEmSlice';
import assignmentManSlice from './slices/assignmentManSlice';
import assignmentStuSlice from './slices/assignmentStuSlice';
import accountStudentSlice from './slices/accountStudentSlice';
import checkinStudentSlice from './slices/checkinStudentSlice';
import evaluationSlice from './slices/evaluationSlice';
import feeTypeSlice from './slices/feeTypeSlice';
import feeCollectionSlice from './slices/feeCollectionSlice';
import expenseSlice from './slices/expenseSlice';
import roomReducer from './slices/roomReducer';
import otherSlice from './slices/otherSlice';
export const store = configureStore({
  reducer: {
    user:userSlice,
    accountState:accountSlice,
    accountStudentState:accountStudentSlice,
    position:positionSlice,
    checkinEm:checkinEmState,
    assignmentMan:assignmentManSlice,
    assignmentStudent:assignmentStuSlice,
    attendance:checkinStudentSlice,
    evaluation:evaluationSlice,
    feeTypeSlice:feeTypeSlice,
    feeCollectionSlice:feeCollectionSlice,
    expenseSlice:expenseSlice,
    roomState: roomReducer,
    otherState: otherSlice
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;