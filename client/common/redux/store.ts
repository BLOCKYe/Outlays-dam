import {configureStore, ThunkAction, Action, AnyAction, combineReducers, Reducer,} from "@reduxjs/toolkit";
import user from '../../modules/users/redux/userSlice'
import {createWrapper} from "next-redux-wrapper";

const combinedReducer = combineReducers({
    user: user,
});

export type RootState = ReturnType<typeof combinedReducer>;

export const store = configureStore({
    reducer: combinedReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper(() => store)