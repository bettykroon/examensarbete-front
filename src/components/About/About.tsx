import './About.scss';
import person from '../../images/person.jpg';
import header from '../../images/header2.jpg';
import { Header } from '../../styledComponents/Header';
import { H2, P } from '../../styledComponents/Headings';

export function About() {
    return (
        <main className='aboutPage'>
            <Header>
                <img src={header} alt="header" />
                <h1>Om oss</h1>
            </Header>

            <div className='ide'>
                <H2>Idé</H2>
                <P>
                    2021 startade jag ett eget företag för att förmedla min fascination 
                    för nya smakkombinationer i dryckesformat. <br /><br />
                    
                    Idén till Kroons Cocktails 
                    föddes under pandemitiden då bar- och restaurangvärlden behövde komma 
                    på nya sätt att nå ut till sina kunder. Det resulterade i alkoholfria 
                    cocktailblandningar som levereras direkt till din postlåda.
                </P>
            </div>

            <div className='vision'>
                <P>
                    Att göra alkoholfria cocktailblandningar tyckte jag var en självklarhet 
                    då du som kund själv får välja om du vill ha en cocktail eller mocktail, 
                    dvs du får själv tillsätta det rekommenderade destillatet till blandningen 
                    för att få en cocktail.
                </P>
                <H2>Vision</H2>
                <img src={person} alt="me" />
            </div>

            <div className='process'>
                <H2>Process</H2>
                <P>
                    Cocktailblandningarna görs i olika smakkombinationer som ska ge dig en ny 
                    smakupplevelse till fredagsmyset, middagsbjudningen, festen eller då du vill 
                    förgylla vardagen. <br /><br />

                    Självklart tillverkar jag blandningarna hemma i mitt eget kök. <br /><br />

                    /Jacob Kroon
                </P>
            </div>
            <img src={person} alt="me" />
        </main>
    )
}

export default About