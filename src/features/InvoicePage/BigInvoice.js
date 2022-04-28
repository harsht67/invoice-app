// styles
import './BigInvoice.scss'

import { getDate, getItemsTotal } from '../../store/invoicesSlice'

function BigInvoice(props) {

    const { id, desc, date, term, from, to, items } = props.invoice

    return (
        <article className='bigInvoice'>
            

            <section className='descBox'>

                <p className='id imp'>
                    #{id}
                </p>

                <p>{desc}</p>

            </section>

            <section className='fromBox'>

                { Object.values(from).map(x => <p>{x}</p>) }

            </section>

            <section className='dateBox'>

                <section>

                    <p className='title'>
                        invoice date
                    </p> 
                    
                    <p className='imp'>
                        {getDate(date)}
                    </p>
                
                </section>
                
                <section>

                    <p className='title'>
                        payment due 
                    </p>
                
                    <p className='imp'>
                        {getDate(date, term)}
                    </p>

                </section>

            </section>

            <section className='toBox'>
                
                <p className='title'>
                    bill to 
                </p>

                <p className='name imp'>
                    {to.name}
                </p>

                <p>{to.addr}</p>
                <p>{to.city}</p>
                <p>{to.code}</p>
                <p>{to.country}</p>

            </section>

            <section className='emailBox'>
                
                <p className='title'>
                    sent to
                </p>

                <p className='email imp'>
                    {to.email}
                </p>

            </section>

            <section className='items'>

                <section className='items__header'>

                    <p className='name'>
                        item name
                    </p>
                    
                    <p className='qty'>
                        qty
                    </p>
                    
                    <p className='price'>
                        price
                    </p>

                    <p className='total'>
                        total
                    </p>

                </section>

                <section className='items__content'>

                    { Object.values(items).map(item => (
                        <div 
                            className='items__item'
                            key={item.id}
                        >
                            <p className='name'>
                                {item.name}
                                <p className='extra'>
                                    <span>{item.qty}</span>
                                    <span>x</span>
                                    <span>&#8377;{item.price}</span>
                                </p>
                            </p>
                            <p className='qty'>
                                {item.qty}
                            </p>
                            <p className='price'>
                                &#8377;{item.price.toLocaleString()}
                            </p>
                            <p className='total'>   
                                &#8377;{(item.price*item.qty).toLocaleString()}
                            </p>
                        </div>
                    ))}

                </section>

                <section className='items__total'>

                    <p>
                        amount due
                    </p>

                    <p className='total'>
                        &#8377;{getItemsTotal(props.invoice.items).toLocaleString()}
                    </p>

                </section>

            </section>

        </article>
    )
}

export default BigInvoice