import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import user from '../../modules/users/redux/userSlice'
import ui from './UISlice'
import outlays from '../../modules/outlays/redux/outlaysSlice'
import categories from '../../modules/categories/redux/categoriesSlice'
import analytics from '../../modules/analytics/redux/analyticsSlice'
import {createWrapper, HYDRATE} from "next-redux-wrapper";

const combinedReducer = combineReducers({
    user,
    ui,
    outlays,
    categories,
    analytics
});

const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
})

export const makeStore = () => store

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore);