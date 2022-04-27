import { createSlice, createSelector } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
    status: 'idle',
    entities: {
        1: {
            id: 1,
            from: {
                addr: 'xyz',
                city: 'xxx',
                code: '111',
                country: 'yyy',
            },
            to: {
                name: 'boi',
                email: 'boi@gmail.com',
                addr: 'abc',
                city: 'a',
                code: '2',
                country: 'bbb',
            },
            date: '24 apr 2020',
            term: 30,
            desc: 'idk',
            status: 'paid',
            items: {
                1: {
                    name: 'item1',
                    qty: 5,
                    price: 500,
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

export const getDate = (date, term) => {
    let due = dayjs(date).add(term, 'day')

    return dayjs(due).format('DD MMM YYYY')
}

export default invoicesSlice.reducer