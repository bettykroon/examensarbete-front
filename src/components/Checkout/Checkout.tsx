import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import header from '../../images/header2.jpg';
import { ProductsInCart } from '../../models/ProductsInCart';
import './Checkout.scss';
import { Button } from '../../styledComponents/Button';
import { Header } from '../../styledComponents/Header';
import { H3, P } from '../../styledComponents/Headings';

export function Checkout(){
    const [ productsInCart, setProductsInCart ] = useState<ProductsInCart[]>([]);

    let orders: any = [];
    let orderAmount = 0;

    useEffect(() => {
        if(localStorage.getItem('order')){
            setProductsInCart(JSON.parse(localStorage.getItem('order') || ''))
        } else {
            window.location.href = "/varukorg";
        }
        
    }, [])

    function setOrderLines(){
        for (let i = 0; i < productsInCart.length; i++) {
            let quantity = productsInCart[i].amount;
            let unit_price = productsInCart[i].cocktail.price * 100;
            let total_amount = quantity * unit_price;
            let order = {type: "physical",
                        name: productsInCart[i].cocktail.drinkName,
                        quantity: quantity,
                        quantity_unit: "pcs",
                        unit_price: unit_price,
                        tax_rate: 2500,
                        total_amount: total_amount,
                        total_discount_amount: 0,
                        total_tax_amount: total_amount * 0.2}                        

            orders.push(order);

            orderAmount += total_amount;
        }
    }

    let products = productsInCart.map((product) => {
        return(<div className="checkoutPage-content-products-product" key={product.cocktail._id}>
                    <img src={'https://kroonscocktails.onrender.com/uploads/' + encodeURIComponent(product.cocktail.drinkName) + '.jpg'} alt={product.cocktail.drinkName} />
                    <div>
                        <H3>{product.cocktail.drinkName}</H3>
                        <P>Antal: {product.amount}</P>
                        <P>{product.cocktail.price} SEK</P>
                    </div>
                </div>)
    })

    function totalPrice(){
        let total = 0;
        for (let i = 0; i < productsInCart.length; i++) {
            let totalPriceProduct = productsInCart[i].amount * productsInCart[i].cocktail.price;
            total += totalPriceProduct;
        }
        return total;
    }


    function klarnaCheckout(){
        setOrderLines();

        fetch("https://kroonscocktails.onrender.com/klarna/klarna", {
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({orders: orders, amount: orderAmount})
        })
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem('klarna', json.html_snippet)
            window.location.href = "/klarna";
        })
    }
    
    return(<main className="checkoutPage">
        <Header>
            <img src={header} alt="header" />
            <h1>Kassa</h1>
        </Header>


        <div className='checkoutPage-content'>
            <Link id='goBack' to='/varukorg'><Button><FontAwesomeIcon icon={faArrowLeftLong}/></Button></Link>
            <div className="checkoutPage-content-products">
                <div>
                    {products}
                
                </div>
            </div>
            
            <aside>
                <H3>Totalt <strong>{`${totalPrice()} SEK`}</strong></H3>

                <Button onClick={klarnaCheckout}>Till betalningen</Button>
            </aside>
        </div>
    </main>)
}

export default Checkout