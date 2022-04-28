// styles
import './Home.scss'

// icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

// components
import Header from './Header'
import Invoice from './Invoice'
import Form from '../Form/Form'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { selectFilteredInvocies } from '../../store/invoicesSlice'

function Home() {

    const invoices = Object.values(useSelector(selectFilteredInvocies))

    const filter = useSelector(state => state.filters.status)

    const [form, setForm] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // opens/closes form
    const toggleForm = () => {
        document.body.style.overflow = !form ? 'hidden' : 'auto'
        setForm(prev => !prev)
    }

    const invoice = {
        id: Math.round(Date.now()/Math.random()*1000+1).toString().slice(4,10),
        from: {
            addr: '',
            city: '',
            code: '',
            country: '',
        },
        to: {
            name: '',
            email: '',
            addr: '',
            city: '',
            code: '',
            country: '',
        },
        date: '',
        term: 30,
        desc: '',
        status: 'pending',
        items: {},
    }

    return (
        <div className='home'>
        
            <Header 
                length={invoices.length} 
                toggleForm={toggleForm}
            />

            <section className='home__invoices'>

                {invoices.length>0
                    ? invoices.map(invoice => <Invoice key={invoice.id} invoice={invoice} />) 
                    : <div className='invoices__error'>
                        
                        <ErrorOutlineIcon className='error__icon' />
                        
                        <span className='error__msg'>
                            no {filter} invoices found!
                        </span>
                    
                    </div>
                }

            </section>

            { form &&
                <Form
                    type='new'
                    invoice={invoice}
                    toggleForm={toggleForm}
                />
            }
        
        </div>
    )
}

export default Home