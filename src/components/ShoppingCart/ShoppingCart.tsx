import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import header from '../../images/header2.jpg';
import { ProductsInCart } from "../../models/ProductsInCart";
import shoppingCart from '../../svg/shoppingCart_black.svg';
import './ShoppingCart.scss';
import { Button } from "../../styledComponents/Button";
import { Header } from "../../styledComponents/Header";
import { H3, H4, P } from "../../styledComponents/Headings";

export function ShoppingCart() {
    const [ productsInCart, setProductsInCart ] = useState<ProductsInCart[]>([]);

    useEffect(() => {
        if(localStorage.getItem('order')){
            setProductsInCart(JSON.parse(localStorage.getItem('order') || ''))
        }
    }, [])

    let products = productsInCart.map((product) => {
        return(<tr key={product.cocktail._id}>
            <td>
                <div className="product">
                    <img src={'https://kroonscocktails.onrender.com/uploads/' + encodeURIComponent(product.cocktail.drinkName) + '.jpg'} alt={product.cocktail.drinkName} />
                    <H4>{product.cocktail.drinkName}</H4>
                </div>
            </td>
            <td>
                <P>
                    <button onClick={() => decQuantity(product)}>-</button> {product.amount} <button onClick={() => incQuantity(product)}>+</button>
                </P>
            </td>
            <td>
                <P> {product.cocktail.price} SEK </P>
            </td>
            <td>
                <P> {`${totalPriceProduct(product.cocktail.price, product.amount)} SEK`} </P>
            </td>
            <td className="trash">
                <button onClick={() => removeFromCart(product)}><FontAwesomeIcon icon={faTrash}/></button>
            </td>
        </tr>)
    })

    function decQuantity(product: ProductsInCart){
        let productsInCart = JSON.parse(localStorage.getItem('order') || '');

        for (let i = 0; i < productsInCart.length; i++) {            
            if (product.cocktail._id === productsInCart[i].cocktail._id) {
                if(productsInCart[i].amount === 1) {
                    return;
                }
                productsInCart[i].amount--;
            }
        }
        
        localStorage.setItem('order', JSON.stringify(productsInCart));
        setProductsInCart(productsInCart);
    }

    function incQuantity(product: ProductsInCart){
        let productsInCart = JSON.parse(localStorage.getItem('order') || '');

        for (let i = 0; i < productsInCart.length; i++) {            
            if (product.cocktail._id === productsInCart[i].cocktail._id) {
                if(productsInCart[i].amount >= productsInCart[i].cocktail.quantity) {
                    return;
                }
                productsInCart[i].amount++;
            }
        }
        
        localStorage.setItem('order', JSON.stringify(productsInCart));
        setProductsInCart(productsInCart);
    }

    function totalPriceProduct(price: number, quantity: number){
        return price * quantity;
    }

    function removeFromCart(product: ProductsInCart){
        let cartProducts = JSON.parse(localStorage.getItem('order') || '');

        for (let i = 0; i < cartProducts.length; i++) {
            if (product.cocktail._id === cartProducts[i].cocktail._id) {
                cartProducts.splice(i, 1);
            }
        }

        localStorage.setItem('order', JSON.stringify(cartProducts));
        window.location.reload();
    }

    function totalPrice(){
        let total = 0;
        for (let i = 0; i < productsInCart.length; i++) {
            let totalPriceProduct = productsInCart[i].amount * productsInCart[i].cocktail.price;
            total += totalPriceProduct;
        }
        return total;
    }

    return (
        <main className="shoppingCart-page">
            <Header>
                <img src={header} alt="header" />
                <h1>Varukorg</h1>
            </Header>

            {productsInCart.length > 0 && <>
            <div className="shoppingCart-page-products">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th><P>Antal</P></th>
                            <th><P>Pris</P></th>
                            <th><P>Totalt</P></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </table>

                <aside>
                    <H4>Totalt <strong>{totalPrice()} SEK</strong></H4>
                    <Link to='/kassa'><Button>Gå till kassan</Button></Link>
                    <Link to='/'><Button>Fortsätt shoppa</Button></Link>
                </aside>
            </div></>}


            {productsInCart.length === 0 && <div className="shoppingCart-page-emptyCart">
                <img className="shoppingCart" src={shoppingCart} alt="shopping cart" />
                <H3>Din varukorg är tom</H3>
                <Link to="/"><Button>Fortsätt shoppa</Button></Link>
            </div>}
            
        </main>
    )
}

export default ShoppingCart