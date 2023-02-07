import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { ICocktail } from "../../models/ICocktail";
import header from '../../images/header2.jpg';
import './CocktailInfo.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Inventory } from "../../models/Inventory";
import { Button } from "../../styledComponents/Button";
import { Header } from "../../styledComponents/Header";
import { H2, H3, H4, P } from "../../styledComponents/Headings";

export function CocktailInfo(){
    let { drink } = useParams();

    const [ quantity, setQuantity ] = useState(1);
    
    const [ cocktail, setCocktail ] = useState<ICocktail>({
        _id: '', 
        drinkName: 'Eldermoon', 
        category: '', 
        inStock: true, 
        quantity: 0, 
        visible: true,
        price: 0,
        description: ''
    });

    const [ allCocktails, setAllCocktails ] = useState<Inventory[]>([]);

    useEffect(() => {        
        fetch("https://kroonscocktails.onrender.com/users/" + drink, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.visible === false) {
                window.location.href = "/"
            } else {
                setCocktail(json);
            }
        })

        fetch("https://kroonscocktails.onrender.com/users", {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {           
            setAllCocktails(json);
        })
    }, [drink])

    function decQuantity(){
        if(quantity === 0) {
            return;
        }
        setQuantity(quantity - 1);
    }

    function incQuantity(){
        if(quantity >= cocktail.quantity) {
            return;
        }
        setQuantity(quantity + 1);
    }

    function addToCart(){
        let amount = quantity;
        if(localStorage.getItem('order')){  

            let productsInCart = JSON.parse(localStorage.getItem('order') || '');
            for (let i = 0; i < productsInCart.length; i++) {
                if(cocktail._id === productsInCart[i].cocktail._id) {                                                            
                    amount = productsInCart[i].amount + quantity;
                    productsInCart.splice(i, 1);                    
                } 
            }            
            let addToOrder = {cocktail, amount};

            productsInCart.push(addToOrder);            
            
            localStorage.setItem('order', JSON.stringify(productsInCart));
            
        } else {
            amount = quantity;
            const order = [{cocktail, amount}]
            localStorage.setItem('order', JSON.stringify(order))
        }

        window.location.reload();
    }

    function otherProducts(){
        for (let i = 0; i < allCocktails.length; i++) {
            if(cocktail._id === allCocktails[i]._id){
                allCocktails.splice(i, 1);
            }
        }

        let promoteProducts = allCocktails.map((product) => {
            return (<Link to={product.category === "cocktailkombo" ? `/${product.category}` : `/${product.drinkName}`} key={product._id}>
                <div>
                    {product.category === "cocktailkombo" ? <img src={require('../../images/' + product.category + '.jpg')} alt={product.drinkName} /> : <img src={require('../../images/' + product.drinkName + '.jpg')} alt={product.drinkName} />}
                    <H4>{product.drinkName}</H4>
                    <P>{product.price} SEK</P>
                </div>
            </Link>)
        })

        return promoteProducts;
    }

    function productDescription(){
        let description = cocktail.description;
        const newDescription = description.split('\n').map((str,i) => <P key={i}>{str}</P>);

        return newDescription;
    }

    
    
    return(
    <main className="cocktailInfoPage">
        <Header>
            <img src={header} alt="header" />
            <h1>{cocktail.category !== "cocktailkombo" ? cocktail.drinkName : cocktail.category}</h1>
        </Header>


        <div className="cocktailInfoPage-info">
            <Link to='/'><Button><FontAwesomeIcon icon={faArrowLeftLong}/></Button></Link>
            <div className="cocktailInfo">
                <div>
                    {cocktail.category === "cocktailkombo" ? <img src={require('../../images/' + cocktail.category + '.jpg')} alt={cocktail.drinkName} /> : <img src={require('../../images/' + cocktail.drinkName + '.jpg')} alt={cocktail.drinkName} />}
                </div>
                <div className="cocktailInfo-text">
                    <H2>{cocktail.drinkName}</H2>
                    <P>{cocktail.price} SEK</P>
                    <div className="decreaseIncrease">
                        <button onClick={decQuantity}>-</button> <H3>{quantity}</H3> <button onClick={incQuantity}>+</button>
                    </div>
                    <Button onClick={addToCart}>Lägg i varukorg</Button>
                    <div className="description">{productDescription()}</div>
                </div>
            </div>
        </div>

        <div className="cocktailInfoPage-youMightAlsoLike">
            <H2>Du kankse också gillar</H2>

            <div className="otherProducts">{otherProducts()}</div>
        </div>
    </main>)
}

export default CocktailInfo