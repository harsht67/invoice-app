// styles
import './Invoice.scss'

// components
import StatusBox from '../StatusBox/StatusBox'

// icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { useNavigate } from 'react-router-dom'
import { getDate, getItemsTotal } from '../../store/invoicesSlice'

function Inovice(props) {

    const navigate = useNavigate()

    const goToFunc = () => {
        navigate('/invoice/'+id)
    } 

    const { id, to, date, term, status } = props.invoice

    return (
        <article 
            className='invoice'
            onClick={goToFunc}
        >
            
            <span className='invoice__id'>
                #{id}
            </span>

            <span className='invoice__name'>
                {to.name}
            </span>

            <span className='invoice__date'>
                due {getDate(date, term)}
            </span>

            <span className='invoice__amount'>
                &#8377;{getItemsTotal(props.invoice.items).toLocaleString()}
            </span>

            <div className='invoice__status'>
                <StatusBox status={status} />
            </div>

            <ArrowForwardIosIcon
                className='arrowIcon'
            />
                
        </article>
    )
}

export default Inovice