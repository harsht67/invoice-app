// styles
import './InvoicePageButtons.scss'

import { invoiceStatusChanged, invoiceDeleted } from '../../store/invoicesSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function InvoicePageButtons({invoice, ...props}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [btnStatus, setBtnStatus] = useState('')

    useEffect(() => {
        if(invoice.status=='paid' || invoice.status=='draft') {
            setBtnStatus('pending')
        }
        else {
            setBtnStatus('paid')
        }
    }, [invoice])

    // deletes invoice 
    const invoiceDeletedFunc = () => {
        dispatch(invoiceDeleted(invoice.id))
        navigate('/')
    }

    // opens edit form
    const editInvoice = () => {
        props.toggleForm()
    }

    // changes status of invoice
    const changeStatus = () => {
        dispatch(invoiceStatusChanged({
            id: invoice.id,
            status: btnStatus,
        }))
    }

    return (
        <div className='invoicePageButtons'>
        
            <button 
                className='editBtn'
                onClick={editInvoice}
            >
                Edit
            </button>

            <button 
                className='deleteBtn'
                onClick={invoiceDeletedFunc}
            >
                Delete
            </button>

            <button 
                className='markBtn'
                onClick={changeStatus}
            >
                Mark as {btnStatus}
            </button>
        
        </div>
    )
}

export default InvoicePageButtons