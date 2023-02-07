import './Contact.scss';
import header from '../../images/header2.jpg';
import { Header } from '../../styledComponents/Header';
import { H3, P } from '../../styledComponents/Headings';

export function Contact() {
    return (
        <main className='contactPage'>
            <Header>
                <img src={header} alt="header" />
                <h1>Kontakt</h1>
            </Header>

            <div className='contactPage-information'>
                <div className='text'>
                    <P>
                        Har du frågor om mina drinkmixer eller behöver en bartender till festen? <br /><br />
                        Tveka inte att höra av dig!
                    </P>
                </div>

                <div className='contactDetails'>
                    <div>
                        <H3>Telefon</H3>
                        <a href="tel:+46767762245">076 - 776 22 45</a>

                        <H3>Mail</H3>
                        <a href="mailto:jacob.kroon@me.com">jacob.kroon@me.com</a>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Contact