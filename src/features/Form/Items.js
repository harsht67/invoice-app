// styles
import './Items.scss'

// icons
import AddIcon from '@mui/icons-material/Add'

// components
import Item from './Item.js'

function Items({items, ...props}) {

    // updates field on change
    const changeHandler = (obj) => {
        props.changeHandler(null, obj)
    }

    // adds a new item (empty)
    const addItem = (e) => {
        e.preventDefault()
        props.addItem()
    }

    // deletes an item based on id
    const deleteItem = (id) => {
        props.deleteItem(id)
    }

    return (
        <div className='items'>
          
            <section className='items__title'>

                <span className='name'>
                    item name
                </span>

                <span className='qty'>
                    qty
                </span>

                <span className='price'>
                    price
                </span>

                <span className='total'>
                    total
                </span>

            </section>

            <section className='items__content'>
            
                { Object.values(items).map(item => (
                    <Item 
                        key={item.id} 
                        item={item}
                        changeHandler={changeHandler}
                        deleteItem={deleteItem}
                    />)) 
                }
            
            </section>

            <button 
                className='items__newBtn'
                onClick={addItem}
            >

                <AddIcon className='icon'/> 
                
                add new item
            
            </button>
        
        </div>
    )
}

export default Items