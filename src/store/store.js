import { configureStore } from '@reduxjs/toolkit'

import invoicesReducer from './invoicesSlice.js'
import filtersReducer from './filtersSlice.js'

const store = configureStore({
    reducer: {
        invoices: invoicesReducer,
        filters: filtersReducer,
    }
})

export default store