import { ChangeEvent, useState } from 'react';
import { User } from '../../models/User';
import { Button } from '../../styledComponents/Button';
import { H2, P } from '../../styledComponents/Headings';
import './LogIn.scss';

export function LogIn(){
    const [ userInput, setUserInput ] = useState<User[]>([]);
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setErrorMessage(false);

        let name: string = e.target.name;
        setUserInput({...userInput, [name]: e.target.value});
    }

    const [ errorMessage, setErrorMessage ] = useState(false);
    function logIn(){        
        fetch("http://localhost:3000/admin/", {
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userInput)
        })
        .then((response) => response.json())
        .then((json) => {                        
            if(json !== "wrong") {
                localStorage.setItem('admin', json);
                window.location.href = "/admin";
            } else {
                setErrorMessage(true);
            }
        })
    }

    return(<main className="loginPage">
        <form>
            <H2>Kroons Cocktails Admin</H2>
            <label htmlFor="username">Användarnamn</label>
            <input type="text" id='username' name='username' onChange={handleChange} />
            <label htmlFor="password">Lösenord</label>
            <input type="password" id='password' name='password' onChange={handleChange} />

            {errorMessage && <P>Fel användarnamn eller lösenord</P>}
            <Button type='button' onClick={logIn}>Logga in</Button>
        </form>
    </main>)
}

export default LogIn