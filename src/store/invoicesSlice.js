import { createSlice, createSelector } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
    status: 'idle',
    entities: {
        13542: {
            id: 13542,
            from: {
                addr: '19 union terrrance',
                city: 'london',
                code: 'E1 3EZ',
                country: 'united kingdom',
            },
            to: {
                name: 'alex grim',
                email: 'alexgrim@gmail.com',
                addr: 'b4 church way',
                city: 'bradford',
                code: 'BO 9PD',
                country: 'united kingdom',
            },
            date: '2020-09-24',
            term: 30,
            desc: 'graphic design',
            status: 'pending',
            items: {
                1: {
                    id: 1,
                    name: 'banner design',
                    qty: 1,
                    price: 10000,
                },
                2: {
                    id: 2,
                    name: 'email design',
                    qty: 2,
                    price: 2500,
                },
            }
        },
        53346: {
            id: 53346,
            from: {
                addr: '19 union terrrance',
                city: 'london',
                code: 'E1 3EZ',
                country: 'united kingdom',
            },
            to: {
                name: 'john morrison',
                email: 'johnmorrison@gmail.com',
                addr: 'E34 new manchester',
                city: 'manchester',
                code: 'D99',
                country: 'united kingdom',
            },
            date: '2020-10-04',
            term: 45,
            desc: 'website design',
            status: 'paid',
            items: {
                1: {
                    id: 1,
                    name: 'website design',
                    qty: 1,
                    price: 75000,
                },
            }
        }
    },
}

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        invoiceAdded(state, action) {   
            const invoice = action.payload
            state.entities[invoice.id] = invoice
        },
        invoiceDeleted(state, action) {
            const id = action.payload
            delete state.entities[id]
        },
        invoiceUpdated(state, action) {
            const invoice = action.payload
            state.entities[invoice.id] = invoice
        },
        invoiceStatusChanged(state, action) {
            const {id, status} = action.payload
            state.entities[id].status = status
        }
    }
})

export const { invoiceAdded, invoiceDeleted, invoiceUpdated, invoiceStatusChanged } = invoicesSlice.actions

// selectors
export const selectFilteredInvocies = createSelector(
    state => state.invoices.entities,
    state => state.filters.status,
    (invoices, status) => {
        if(status=='all') {
            return invoices
        }
        else {
            let list = Object.values(invoices).filter(invoice => invoice.status==status)
            return list
        }
    }
)

export const getItemsTotal = (items) => {
    let total = 0
    Object.values(items).forEach(item => {
        const {qty, price} = item
        total+=qty*price
    })
    return total
}

export const getDate = (date, term=0) => {
    let due = dayjs(date).add(term, 'day')

    return dayjs(due).format('DD MMM YYYY')
}

export default invoicesSlice.reducer