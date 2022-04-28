// styles
import './Header.scss'

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterChanged } from '../../store/filtersSlice'

function Header(props) {

    const [dropdown, setDropdown] = useState(false)
    
    const filter = useSelector(state => state.filters.status)
    const dispatch = useDispatch()

    const addInvoice = () => {
        props.toggleForm()
    }

    // opens/closes dropdown 
    const toggleDropdown = () => {
        setDropdown(prev => !prev)
    }

    // changes current filter
    const changeFilter = (e) => {
        const filter = e.target.getAttribute('data-val')
        dispatch(filterChanged(filter))
        toggleDropdown()
    }

    return (
        <div className='header'>
        
            <section className='header__title'>

                <h1>
                    Invoices
                </h1>

                <span className='title__sub'>
                    {props.length}
                </span>

            </section>  

            <section className='header__filter'>

                <span 
                    className='filter__btn'
                    onClick={toggleDropdown}
                >
                    
                    {filter}
                    
                    <KeyboardArrowDownIcon
                        className='icon'
                    />
                
                </span>

                { dropdown &&
                    <div className='filter__dropdown'>

                        {['all', 'paid', 'pending', 'draft'].map(filter => (
                            <p
                                className='dropdown__item'
                                data-val={filter}
                                onClick={changeFilter}
                            >
                                {filter}
                            </p>))
                        }
                    
                    </div>
                }

            </section>

            <section 
                className='header__newBtn'
                onClick={addInvoice}
            >

                <AddCircleIcon
                    className='newBtn__icon'
                />

            </section>
        
        </div>
    )
}

export default Header