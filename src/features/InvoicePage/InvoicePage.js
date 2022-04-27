// styles
import './InvoicePage.scss'

// components
import InvoicePageButtons from './InvoicePageButtons'
import BigInvoice from './BigInvoice'
import StatusBox from '../StatusBox/StatusBox'

// icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CircleIcon from '@mui/icons-material/Circle'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../Form/Form'
import { useState, useEffect } from 'react'

function InvoicePage() {

    const { id } = useParams()

    const invoices = useSelector(state => state.invoices.entities)

    const invoice = invoices[id]

    const naviagte = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const goToFunc = () => {
        naviagte('/')
    }
    
    const [form, setForm] = useState(false)

    // open/close form
    const toggleForm = () => {
        document.body.style.overflow = !form ? 'hidden' : 'auto'
        setForm(prev => !prev)
    }

    return (
        <div className='invoicePage'>
        
            <section 
                className='invoicePage__backBtn'
                onClick={goToFunc}
            >

                <ArrowBackIosNewIcon className='icon' />

                Go back

            </section>

            <section className='invoicePage__headerRow1'>

                <section className='header__status'>

                    Status 

                    <StatusBox status={invoice.status} />
                
                </section>

                <InvoicePageButtons
                    invoice={invoice}
                    toggleForm={toggleForm}
                />

            </section>

            <section className='invoicePage__headerRow2'>

                <InvoicePageButtons
                    invoice={invoice}
                    toggleForm={toggleForm}
                />

            </section>

            <section className='invoicePage__main'>
    
                <BigInvoice invoice={invoice} />

            </section>

            { form && 
                <Form 
                    type='edit' 
                    invoice={invoice} 
                    toggleForm={toggleForm}
                /> 
            }

        </div>
    )
}

export default InvoicePage