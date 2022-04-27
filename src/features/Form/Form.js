// styles
import './Form.scss'
import { Label } from './styles'

// components
import Input from './Input'
import Dropdown from './Dropdown'
import Items from './Items'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { invoiceAdded, invoiceUpdated } from '../../store/invoicesSlice'

function Form(props) {

    const [data, setData] = useState(props.invoice)

    const dispatch = useDispatch()

    useEffect(() => {
        if(props.type=='new'){
            let id = Math.round(Date.now()/Math.random()*1000+1).toString().slice(4,10)
            setData({
                id,
                from: {
                    address: '',
                    city: '',
                    code: '',
                    country: '',
                },
                to: {
                    name: '',
                    email: '',
                    address: '',
                    city: '',
                    code: '',
                    country: '',
                },
                date: '',
                term: 30,
                desc: '',
                status: 'pending',
                items: {},
            })
        }
    }, [])

    // updates input field
    const changeHandler = (obj) => {

        const {id, name, value} = obj

        if(name.includes('-')) {
            const [cat, type] = name.split('-')

            if(cat=='items') {

                setData({
                    ...data,
                    [cat]: {
                        ...data[cat],
                        [id]: {
                            ...data[cat][id],
                            [type]: value,
                        }
                    }
                })

            }
            else {

                setData({
                    ...data,
                    [cat]: {
                        ...data[cat],
                        [type]: value,
                    }
                })

            }
        
        }
        else {

            setData({
                ...data,
                [name]: value,
            })

        }

    }

    // adds an item to invoice.items (empty)
    const addItem = () => {
        let id = Math.floor(Date.now()/Math.random()*10+1)
        setData(prev => {
            return {
                ...prev,
                items: {
                    ...prev.items,
                    [id]: {
                        id: id,
                        name: '',
                        qty: '',
                        price: '',
                    }
                }
            }
        })
    }

    // delete an item from invoice.items 
    const deleteItem = (id) => {
        let newList = {}
        Object.values(data.items).forEach(item => {
            if(item.id!=id) {
                newList[item.id] = item
            }
        })
        
        setData(prev => {
            return {
                ...prev,
                items: newList,
            }
        })
    }

    // save updates
    const saveInvoice = (e) => {

        e.preventDefault()

        if(props.type=='edit') {
            dispatch(invoiceUpdated(data))
        }
        else {
            dispatch(invoiceAdded(data))
        }

        closeForm()
    
    }

    // closes form
    const closeForm = () => {
        props.toggleForm()
    }

    return (
        <article className='form__container'>
        
            { data &&
                <div className='form'>

                    <h2 className='form__title'>

                        {props.type=='new' ? props.type : props.type+' #'+data.id}

                    </h2>

                    <form>

                        <fieldset className='form__from'>

                            <legend className='form__subTitle'>
                                bill from 
                            </legend>

                            <Input
                                title='street address'
                                name='from-addr'
                                value={data.from.addr}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title='city'
                                name='from-city'
                                value={data.from.city}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title='post code'
                                name='from-code'
                                value={data.from.code}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title='country'
                                name='from-country'
                                value={data.from.country}
                                changeHandler={changeHandler}
                            />

                        </fieldset>

                        <fieldset className='form__to'>

                            <legend className='form__subTitle'>
                                bill to
                            </legend>

                            <Input
                                title="client's name"
                                name='to-name'
                                value={data.to.name}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title="client's email"
                                name='to-email'
                                value={data.to.email}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title='street address'
                                name='to-addr'
                                value={data.to.addr}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title='city'
                                name='to-city'
                                value={data.to.city}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title='post code'
                                name='to-code'
                                value={data.to.code}
                                changeHandler={changeHandler}
                            />

                            <Input
                                title='country'
                                name='to-country'
                                value={data.to.country}
                                changeHandler={changeHandler}
                            />

                            

                        </fieldset>

                        <fieldset className='form__extra'>

                            <Input
                                title='invoice date'
                                name='date'
                                value={data.date}
                                type='date'
                                changeHandler={changeHandler}
                            />
                            
                            <Label 
                                className='term'
                            >

                                payment terms
                                
                                <Dropdown
                                    data={data.term}
                                    changeHandler={changeHandler}
                                />

                            </Label>

                            <Input
                                title='project description'
                                name='desc'
                                value={data.desc}
                                changeHandler={changeHandler}
                            />

                        </fieldset>

                        <fieldset className='form__items'>

                            <legend className='form__subTitle'>
                                item list
                            </legend>

                            <Items 
                                items={data.items} 
                                changeHandler={changeHandler}
                                addItem={addItem}
                                deleteItem={deleteItem}
                            />

                        </fieldset>

                        <fieldset className='form__btns'>

                            <button onClick={closeForm} >
                                cancel
                            </button>

                            <button onClick={saveInvoice} >
                                save changes
                            </button>

                        </fieldset>

                    </form>

                </div>
            }
        
        </article>
    )
}

export default Form