import './Footer.scss';
import logotype from '../../images/logotype.png';
import { H3, P } from '../../styledComponents/Headings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';


export function Footer() {
    return (
        <footer>
            <div>
                <H3>Kontakt</H3>

                <P><FontAwesomeIcon icon={faPhone}/> 070 111 22 33</P>

                <P><FontAwesomeIcon icon={faEnvelope}/> jacob@kroonscocktails.se</P>

                <P><FontAwesomeIcon icon={faLocationDot}/> Storgatan 1, 111 22 Umeå </P>
                
                <div className='socialMedias'>
                    <a href="https://www.instagram.com/kroonscocktails/?hl=sv" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faInstagram}/></a>
                    <a href="https://www.facebook.com/Kroonscocktails/" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faFacebookSquare}/></a>
                </div>
            </div>

            <div id='logotype'>
                <img src={logotype} alt="logotype" />
            </div>
        </footer>
    )
}

export default Footer