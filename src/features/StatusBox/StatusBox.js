// styles
import './StatusBox.scss'

// icons
import CircleIcon from '@mui/icons-material/Circle'

function StatusBox({status}) {
    return(
        <div className={`statusBox ${status}`}>

            <CircleIcon className='icon' />

            {status}

        </div>
    )
}

export default StatusBox