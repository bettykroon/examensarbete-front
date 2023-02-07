import { ICocktail } from "./ICocktail";

export class ProductsInCart{
    constructor(
        public cocktail: ICocktail, 
        public amount: number){}
}