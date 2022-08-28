/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 27/08/2022
 * Time: 15:51
*/

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

interface UISlice {
    loading: boolean
}

const initialState: UISlice = {
    loading: false
}

export const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    },
})

export const selectLoading = (state: RootState) => state.ui.loading;
export const {setLoading} = UISlice.actions

export default UISlice.reducer;