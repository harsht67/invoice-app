// styles
import './Dropdown.scss'

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useState } from 'react'

function Dropdown(props) {

    const [dropdown, setDropdown] = useState(false)

    // opens/closes dropdown
    const toggleDropdown = () => {
        setDropdown(prev => !prev)
    }

    // changes term-dropdown selected value
    const dropdownHandler = (e) => {
        let val = e.target.getAttribute('data-val')

        toggleDropdown()
        
        props.changeHandler(null, {
            name: 'term',
            value: val,
        })
    }

    return (
        <div className='dropdown'>

            <div 
                className='dropdown__btn'
                onClick={toggleDropdown}
            >
                
                net {props.data} days

                <KeyboardArrowDownIcon
                    className='icon'
                />

            </div>

            {dropdown &&
                <div className='dropdown__data'>

                    <p
                        className='dropdown__item'
                        data-val='30'
                        onClick={dropdownHandler}
                    >
                        30 days
                    </p>

                    <p
                        className='dropdown__item'
                        data-val='45'
                        onClick={dropdownHandler}
                    >
                        45 days
                    </p>

                    <p
                        className='dropdown__item'
                        data-val='60'
                        onClick={dropdownHandler}
                    >
                        60 days
                    </p>

                </div>
            }

        </div>
    )
}

export default Dropdown