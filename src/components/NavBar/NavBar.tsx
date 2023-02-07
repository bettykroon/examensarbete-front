import "./NavBar.scss";
import logotype from '../../images/logotype_black.png';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { H2, H3 } from "../../styledComponents/Headings";

export function NavBar() {
    const [ productsInCart, setProductsInCart ] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('order') || '') {
            let test = JSON.parse(localStorage.getItem('order') || '');
            setProductsInCart(test.length);
        }
    }, [])

    const [ display, setDisplay ] = useState(false);
    function toggleMenu(){
        setDisplay(!display);
    }

    return (
        <>
        <div className="navbar">
            <Link id="company-name" to='/'><H2>Kroons Cocktails</H2></Link>

            <img src={logotype} alt="logotype" />

            <nav>
                <Link to='/'><H3>Hem</H3></Link>
                <Link to='/om-oss'><H3>Om oss</H3></Link>
                <Link to='/kontakt'><H3>Kontakt</H3></Link>
                <Link to='/varukorg'>
                    <svg width="51" height="57" viewBox="0 0 51 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40.5" cy="10.5" r="10" stroke="black"/>
                        {productsInCart > 0 && <text x="80%" y="26%" textAnchor="middle" fill="black">{productsInCart}</text>}
                        <path d="M1 9.95776H6.02817L11.9838 15.2817M25.5493 27.4085V50.4789M25.5493 27.4085L32.3521 20.6057M25.5493 27.4085L11.9838 15.2817M25.5493 50.4789L16.9718 55.5071H32.3521L25.5493 50.4789ZM28.2113 15.2817H11.9838" stroke="black" strokeLinecap="round"/>
                    </svg>
                </Link>

                <FontAwesomeIcon id="menuIcon" icon={faBars} onClick={toggleMenu}/>
            </nav>

        </div>
        
        {display && <div className="hamburgerMenu">
            <div id="close">
                <FontAwesomeIcon icon={ faClose } onClick={toggleMenu}/>
            </div>
            <nav>
                <Link to='/' onClick={toggleMenu}><H3>Hem</H3></Link>
                <Link to='/om-oss' onClick={toggleMenu}><H3>Om oss</H3></Link>
                <Link to='/kontakt' onClick={toggleMenu}><H3>Kontakt</H3></Link>
                <Link to='/varukorg' id="shoppingCart" onClick={toggleMenu}>
                    <svg width="51" height="57" viewBox="0 0 51 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40.5" cy="10.5" r="10" stroke="white"/>
                        {productsInCart > 0 && <text x="80%" y="26%" textAnchor="middle" fill="white">{productsInCart}</text>}
                        <path d="M1 9.95776H6.02817L11.9838 15.2817M25.5493 27.4085V50.4789M25.5493 27.4085L32.3521 20.6057M25.5493 27.4085L11.9838 15.2817M25.5493 50.4789L16.9718 55.5071H32.3521L25.5493 50.4789ZM28.2113 15.2817H11.9838" stroke="white" strokeLinecap="round"/>
                    </svg>
                </Link>
            </nav>
        </div>}
        </>
    )
}

export default NavBar