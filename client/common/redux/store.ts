import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import user from '../../modules/users/redux/userSlice'
import {createWrapper, HYDRATE} from "next-redux-wrapper";

const combinedReducer = combineReducers({
    user: user,
});

const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({reducer});

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore);