import { ChangeEvent, useEffect, useState } from "react"
import { ICocktail } from "../../models/ICocktail";
import { Inventory } from "../../models/Inventory";
import { Button } from "../../styledComponents/Button";
import { H2, H4, P } from "../../styledComponents/Headings";
import "./Admin.scss";

export function Admin(){
    const [ showAdminPage, setShowAdminPage ] = useState(false);
    useEffect(() => {
        if(!localStorage.getItem('admin')){
            window.location.href = "/admin-login";
        } else {
            setShowAdminPage(true);
            getInventory();
        }
    }, [])

    const [ inventory, setInventory ] = useState<Inventory[]>([]);
    function getInventory(){
        fetch("https://kroonscocktails.onrender.com/users", {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            setInventory(json);
            setButtonText('Andra cocktails');
            setHeaderText('Nuvarande drinkar i lager')
        })
    }

    let products = inventory.map((product) => {
        return (
            <div className="product" key={product._id}>
                {product.category === "cocktailkombo" ? <img src={require('../../images/' + product.category + '.jpg')} alt={product.drinkName} /> : <img src={require('../../images/' + product.drinkName + '.jpg')} alt={product.drinkName} />}
                <H4>{product.drinkName}</H4>
                <P>{product.price} SEK</P>
                <div>
                    <Button onClick={() => toggleUpdateModule(product.drinkName)}>Ändra</Button>
                    <Button onClick={() => toggleModule(product._id, product.drinkName)}>Ta bort</Button>
                </div>
            </div>
        )
    })

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

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
        let name: string = e.target.name;
        let value: any = e.target.value;

        if(value === "" && (name === "price" || name === "quantity")) {
            value = 0;
        }

        if (name === "visible") {
            value = JSON.parse(value);
        }

        if((name === "price" || name === "quantity") && typeof value === "string") {
            value = parseInt(value);
        }
        setCocktail({...cocktail, [name]: value});
    }
    
    const [ showUpdateModule, setShowUpdateModule ] = useState(false);
    function toggleUpdateModule(drink: string){
        setShowUpdateModule(!showUpdateModule);
        fetch("https://kroonscocktails.onrender.com/users/" + drink, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setCocktail(json);
        })
    }

    function updateProduct(){                
        fetch("https://kroonscocktails.onrender.com/users/update", {
            method: "PUT",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(cocktail)
        })
        .then((response) => response.json())
        .then((json) => {
        })
        window.location.reload();
    }

    const [ productID, setProductID ] = useState('');
    const [ drinkName, setDrinkName ] = useState('');
    const [ showModule, setShowModule ] = useState(false);
    function toggleModule(id: string, drink: string){
        setProductID(id);
        setDrinkName(drink);
        setShowModule(!showModule);
    }

    function removeProduct(){
        let data = {id: productID};

        fetch("https://kroonscocktails.onrender.com/users/remove", {
            method: "PUT",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => {
        })
        window.location.reload();
    }

    const [ buttonText,  setButtonText ] = useState('Andra cocktails');
    const [ headerText,  setHeaderText ] = useState('Nuvarande drinkar i lager');
    function showOtherCocktails() {
        fetch("https://kroonscocktails.onrender.com/users/notAvailable", {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            setInventory(json);
            setButtonText('Drinkar i lager');
            setHeaderText('Drinkar som inte finns i lager')
        })
    }

    const [ addNewCocktailButton, setAddNewCocktailButton ] = useState(false);
    function toggleAddNewCocktailModule(){
        setAddNewCocktailButton(!addNewCocktailButton);
    }

    function logOut(){
        localStorage.removeItem('admin');
        setShowAdminPage(false);
        window.location.href = "/admin-login";
    }

    /*const [file, setFile] = useState(null);

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        // måste vänta tills hemsidan är live 
        
        if(file === null ) {
            return;
        } else {
            console.log(file);
            
            const data = new Blob([file]);
            const options = {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'image/jpg'
            }
            };
            fetch('', options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

        }
    };*/

    return(<>
        {showAdminPage && <main className="adminPage">
            <header>
                <H2>Admin page</H2>
                <Button onClick={logOut}>Logga ut</Button>
            </header>

            <section>
                <div className="buttons">
                    <Button onClick={buttonText === "Andra cocktails" ? showOtherCocktails : getInventory}>{buttonText}</Button>
                    <Button onClick={toggleAddNewCocktailModule}>+ Lägg till ny cocktail</Button>
                </div>

                <H2>{headerText}</H2>

                <div className="products">
                    {products}
                </div>

                {showModule && <div className="module">
                    <div className="module-container">
                        <P>Är du säker på att du vill ta bort {drinkName}?</P>

                        <div className="module-container-buttons">
                            <Button onClick={removeProduct}>Ja</Button>
                            <Button onClick={() => setShowModule(false)}>Nej</Button>
                        </div>
                    </div>
                </div>}

                {showUpdateModule && <div className="module">
                    <div className="module-container">
                        <input type="text" name="drinkName" value={cocktail.drinkName} onChange={handleChange}/>
                        
                        <select value={cocktail.category} name="category" onChange={handleChange}>
                            <option value="cocktailkombo">Cocktailkombo</option>
                            <option value="cocktailkuvert">Cocktailkuvert</option>
                        </select>

                        <textarea rows={10} name="description" value={cocktail.description} onChange={handleChange}></textarea>
                        
                        <label htmlFor="price">Pris</label>
                        <input type="text" name="price" value={cocktail.price} onChange={handleChange}/>
                        
                        <label htmlFor="quantity">Antal</label>
                        <input type="text" name="quantity" value={cocktail.quantity} onChange={handleChange}/>
                        
                        <label htmlFor="visible">Synas på hemsidan?</label>
                        <select value={JSON.stringify(cocktail.visible)} name="visible" onChange={handleChange}>
                            <option value="true">Ja</option>
                            <option value="false">Nej</option>
                        </select>
                        
                        <div className="module-container-buttons">
                            <Button onClick={updateProduct}>Uppdatera</Button>
                            <Button onClick={() => setShowUpdateModule(false)}>Avbryt</Button>
                        </div>
                    </div>
                </div>}

                {addNewCocktailButton && <div className="module">
                    <div className="module-container">
                        <label htmlFor="drinkName">Namn:</label>
                        <input type="text" name="drinkName" onChange={handleChange}/>
                        
                        <select name="category" onChange={handleChange}>
                            {cocktail.category === "cocktailkombo" ? <option value="cocktailkombo">Cocktailkombo</option> : <option value="cocktailkuvert">Cocktailkuvert</option>}
                            {cocktail.category !== "cocktailkombo" ? <option value="cocktailkombo">Cocktailkombo</option> : <option value="cocktailkuvert">Cocktailkuvert</option>}
                        </select>

                        <label htmlFor="description">Beskrivning</label>
                        <textarea name="description" onChange={handleChange}></textarea>
                        
                        <label htmlFor="price">Pris</label>
                        <input type="text" name="price" onChange={handleChange}/>
                        
                        <label htmlFor="quantity">Antal</label>
                        <input type="text" name="quantity" onChange={handleChange}/>
                        
                        <label htmlFor="visible">Synas på hemsidan?</label>
                        <select value={JSON.stringify(cocktail.visible)} name="visible" onChange={handleChange}>
                            <option value="true">Ja</option>
                            <option value="false">Nej</option>
                        </select>

                        {/*<input type="file" name="image" id="image" onChange={handleFileChange}/>*/}
                        
                        <div className="module-container-buttons">
                            {/*<Button onClick={handleUpload}>Lägg till</Button>*/}
                            <Button onClick={() => setAddNewCocktailButton(false)}>Avbryt</Button>
                        </div>
                    </div>
                </div>}
            </section>
        </main>}
    </>)
}

export default Admin