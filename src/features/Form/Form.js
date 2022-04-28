// styles
import './Form.scss'
import { Label } from './styles'

// components
// import Input from './Input'
import Dropdown from './Dropdown'
import Items from './Items'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { invoiceAdded, invoiceUpdated } from '../../store/invoicesSlice'
import { getIn, useFormik } from 'formik'
import * as Yup from 'yup'

function Form(props) {

    const [data, setData] = useState(props.invoice)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(props.type=='new'){
    //         let id = Math.round(Date.now()/Math.random()*1000+1).toString().slice(4,10)
    //         setData({
    //             id,
    //             from: {
    //                 addr: '',
    //                 city: '',
    //                 code: '',
    //                 country: '',
    //             },
    //             to: {
    //                 name: '',
    //                 email: '',
    //                 addr: '',
    //                 city: '',
    //                 code: '',
    //                 country: '',
    //             },
    //             date: '',
    //             term: 30,
    //             desc: '',
    //             status: 'pending',
    //             items: {},
    //         })
    //     }
    // }, [])

    // form validations 

    const schema = Yup.object().shape({
        from: Yup.object().shape({
            addr: Yup.string().required('required'),
            city: Yup.string().required('required'),
            code: Yup.string().required('required'),
            country: Yup.string().required('required'),
        }),
        to: Yup.object().shape({
            name: Yup.string().required('required'),
            email: Yup.string().email('invalid email').required('required'),
            addr: Yup.string().required('required'),
            city: Yup.string().required('required'),
            code: Yup.string().required('required'),
            country: Yup.string().required('required'),
        }),
        term: Yup.string().required('required'),
        desc: Yup.string().required('required'),
    })

    const { 
        handleSubmit, 
        handleChange, 
        handleBlur, 
        touched, 
        errors 
    } = useFormik({
        initialValues: data,
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    // updates input field
    const changeHandler = (e, obj=null) => {

        const {id, name, value} = obj ? obj : e.target  

        if(name.includes('.')) {
            const [cat, type] = name.split('.')

            if(cat=='items') {
                let val 
                if(type=='qty'||type=='price') {
                    if(!isNaN(value)) {
                        val = value 
                    }
                    else {
                        val = ''
                    }
                }
                else {
                    val = value
                }

                val &&
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

                handleChange(e)

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

            name!='term' && handleChange(e)

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

        if(!Object.keys(errors).length) {

            if(props.type=='edit') {
                dispatch(invoiceUpdated(data))
            }
            else {
                dispatch(invoiceAdded(data))
            }

           closeForm()

        }
    
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

                    <form onSubmit={handleSubmit} >

                        <fieldset className='form__from'>

                            <legend className='form__subTitle'>
                                bill from 
                            </legend>

                            <Label className={`input from.addr`}>

                                street address 

                                <input
                                    name='from.addr'
                                    value={data.from.addr}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'from.addr') && getIn(errors, 'from.addr') 
                                    ? <span className='input__err'>{getIn(errors, 'from.addr')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input from.city`}>

                                city

                                <input
                                    name='from.city'
                                    value={data.from.city}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'from.city') && getIn(errors, 'from.city') 
                                    ? <span className='input__err'>{getIn(errors, 'from.city')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input from.code`}>

                                post code

                                <input
                                    name='from.code'
                                    value={data.from.code}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'from.code') && getIn(errors, 'from.code') 
                                    ? <span className='input__err'>{getIn(errors, 'from.code')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input from.country`}>

                                country

                                <input
                                    name='from.country'
                                    value={data.from.country}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'from.country') && getIn(errors, 'from.country') 
                                    ? <span className='input__err'>{getIn(errors, 'from.country')}</span>
                                    : null
                                }

                            </Label>

                        </fieldset>

                        <fieldset className='form__to'>

                            <legend className='form__subTitle'>
                                bill to
                            </legend>

                            <Label className={`input to.name`}>

                                client' name

                                <input
                                    name='to.name'
                                    value={data.to.name}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'to.name') && getIn(errors, 'to.name') 
                                    ? <span className='input__err'>{getIn(errors, 'to.name')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input to.email`}>

                                client's email

                                <input
                                    name='to.email'
                                    value={data.to.email}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'to.email') && getIn(errors, 'to.email') 
                                    ? <span className='input__err'>{getIn(errors, 'to.email')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input to.addr`}>

                                street address

                                <input
                                    name='to.addr'
                                    value={data.to.addr}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'to.addr') && getIn(errors, 'to.addr') 
                                    ? <span className='input__err'>{getIn(errors, 'to.addr')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input to.city`}>

                                city

                                <input
                                    name='to.city'
                                    value={data.to.city}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'to.city') && getIn(errors, 'to.city') 
                                    ? <span className='input__err'>{getIn(errors, 'to.city')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input to.code`}>

                                post code

                                <input
                                    name='to.code'
                                    value={data.to.code}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'to.code') && getIn(errors, 'to.code') 
                                    ? <span className='input__err'>{getIn(errors, 'to.code')}</span>
                                    : null
                                }

                            </Label>

                            <Label className={`input to.country`}>

                                country

                                <input
                                    name='to.country'
                                    value={data.to.country}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'to.country') && getIn(errors, 'to.country') 
                                    ? <span className='input__err'>{getIn(errors, 'to.country')}</span>
                                    : null
                                }

                            </Label>
                            
                        </fieldset>

                        <fieldset className='form__extra'>

                            <Label className={`input date`}>

                                date

                                <input
                                    name='date'
                                    type='date'
                                    value={data.date}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'date') && getIn(errors, 'date') 
                                    ? <span className='input__err'>{getIn(errors, 'date')}</span>
                                    : null
                                }

                            </Label>
                            
                            <Label 
                                className='term'
                            >

                                payment terms
                                
                                <Dropdown
                                    data={data.term}
                                    changeHandler={changeHandler}
                                    onBlur={handleBlur}
                                />

                            </Label>

                            <Label className={`input desc`}>

                                product description

                                <input
                                    name='desc'
                                    value={data.desc}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                />

                                {
                                    getIn(touched, 'desc') && getIn(errors, 'desc') 
                                    ? <span className='input__err'>{getIn(errors, 'desc')}</span>
                                    : null
                                }

                            </Label>

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
                                errors={errors}
                                touched={touched}
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