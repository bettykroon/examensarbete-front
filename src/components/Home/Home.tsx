import headerPhoto from '../../images/header.jpg';
import Ruby from '../../images/Ruby Rose.jpg';
import './Home.scss'; 
import { useEffect, useState } from 'react';
import { Inventory } from '../../models/Inventory';
import { Link } from 'react-router-dom';
import { H1, H2, H3, H4, P } from '../../styledComponents/Headings';
import gardshem from '../../images/gardshem.png';
import jazzkoket from '../../images/jazzkoket.jpeg';
import matstudios20 from '../../images/matstudios20.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import instagramBild6 from '../../images/instagramBild6.png';
import instagramBild5 from '../../images/instagramBild5.png';
import instagramBild4 from '../../images/instagramBild4.png';
import instagramBild3 from '../../images/instagramBild3.png';

export function Home() {
    const [ inventory, setInventory ] = useState<Inventory[]>([]);

    useEffect(() => {
        fetch("https://kroonscocktails.onrender.com/inventory", {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            setInventory(json); 
        })
    }, [])

    let kombos = inventory.map((cocktailkombo) => {
        let presentation;
        if(cocktailkombo.category === "cocktailkombo") {
            presentation = (
                <Link to={`/${cocktailkombo.category}`} key={cocktailkombo._id}>
                    <div>
                        <img src={'https://kroonscocktails.onrender.com/uploads/' + cocktailkombo.category + '.jpg'} alt="Cocktail" />
                        <hr />
                        <H4>{cocktailkombo.drinkName}</H4>
                        <P>{cocktailkombo.price} SEK</P>
                    </div>
                </Link>
            )
        } 

        if(presentation === undefined) {
            return '';
        } else {
            return presentation;
        }
    })

    let kuverts = inventory.map((cocktailkuvert) => {
        let presentation;
        if(cocktailkuvert.category === "cocktailkuvert") {            
            presentation = (
                <Link to={`/${cocktailkuvert.drinkName}`} key={cocktailkuvert._id}>
                <div>
                    <img src={'https://kroonscocktails.onrender.com/uploads/' + encodeURIComponent(cocktailkuvert.drinkName) + '.jpg'} alt="Cocktail" />
                    <hr />
                    <H4>{cocktailkuvert.drinkName}</H4>
                    <P>{cocktailkuvert.price} SEK</P>
                </div>
                </Link>
            )
        }
        if(presentation === undefined) {
            return '';
        } else {
            return presentation;
        }
    })

    return (
        <main className='homePage'>
            <div className='homePage-header'>
                <img src={headerPhoto} alt="header" />
                <div>
                    <H1>Kroons Cocktails</H1>
                    <P>hemgjorda drinkmixer direkt till din brevlåda</P>
                </div>
            </div>

            <div className='homePage-products'>
                <H2>Produkter</H2>
                {kuverts[0] !== '' && inventory.length > 0 && <div className='homePage-products-container'>
                    <H3>Cocktailkuvertet</H3>
                    <P>ett cocktailkuvert innehåller två drinkar</P>
                    <hr />
                    
                    <div className='homePage-products-container-cocktails'>
                        {kuverts}
                    </div>
                </div>}

                {kombos[inventory.length] !== '' && inventory.length > 0 && <div className='homePage-products-container'>
                    <H3>Cocktailkombon</H3>
                    <P>en cocktailkombo består av en av varje cocktailkuvert, totalt sex drinkar</P>
                    <hr />

                    <div className='homePage-products-container-cocktails'>
                        {kombos}
                    </div>
                </div>}

                {inventory.length === 0 && <p>Currently shaking cocktails, available soon!</p>}

            </div>

            <div className='homePage-sponsors'>
                <H3>Finns även att köpa hos</H3>
                <div>
                    <img src={gardshem} alt="Gårdshem Umeå" />
                    <img src={jazzkoket} alt="Jazzköket Saluhall Östersund" />
                    <img src={matstudios20} alt="matstudioS20 Örnsköldsvik" />
                </div>
            </div>

            <div className='homePage-socialMedias'>
                <H3>Följ mig på social medier</H3>
                <a href="https://www.instagram.com/kroonscocktails/?hl=sv" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faInstagram}/></a>
                <a href="https://www.facebook.com/Kroonscocktails/" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faFacebookSquare}/></a>

                <a href="https://www.instagram.com/kroonscocktails/?hl=sv" rel="noreferrer" target="_blank"><div>
                    <img src={instagramBild5} alt="" />
                    <img src={instagramBild4} alt="" />
                    <img src={instagramBild3} alt="" />
                    <img src={Ruby} alt="" />
                    <img src={instagramBild6} alt="" />
                </div></a>
            </div>
        </main>
    )
}

export default Home