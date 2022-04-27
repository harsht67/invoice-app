import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'all',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChanged(state, action) {
            state.status = action.payload
        }
    },
})

export const { filterChanged } = filtersSlice.actions

export default filtersSlice.reducer