// styles
import './Input.scss'
import { Label } from './styles.js'

function Input(props) {

    const changeHandler = (e) => {
        const {name, value} = e.target 

        props.changeHandler({name, value})
    }

    const { title, name, value, type } = props

    return (
        <Label className={`input ${name}`}>

            {title}

            <input
                name={name}
                type={type || 'text'}
                value={value}
                onChange={changeHandler}
            />

        </Label>
    )
}

export default Input