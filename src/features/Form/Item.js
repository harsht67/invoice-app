// styles
import './Item.scss'

// icons
import DeleteIcon from '@mui/icons-material/Delete'

function Items(props) {

    // updates item fields 
    const changeHandler = (e) => {
        const {name, value} = e.target
        props.changeHandler({id, name, value})
    }

    // delete item
    const deleteItem = () => {
        props.deleteItem(id)
    }

    const {id, name, qty, price} = props.item

    return (
        <div className='item'>
          
            <input 
                className='name'
                name='items.name'
                value={name}
                onChange={changeHandler}
            />

            <input 
                className='qty'
                name='items.qty'
                value={qty}
                onChange={changeHandler}
            />

            <input 
                className='price'
                name='items.price'
                value={price}
                onChange={changeHandler}
            />

            <input 
                className='total'
                value={qty*price}
                disabled
            />

            <DeleteIcon
                className='deleteIcon'
                onClick={deleteItem}
            />
        
        </div>
    )
}

export default Items