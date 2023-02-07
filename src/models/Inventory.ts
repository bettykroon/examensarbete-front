export class Inventory{
    constructor(
        public _id: string, 
        public drinkName: string, 
        public category: string, 
        public inStock: boolean, 
        public quantity: number, 
        public visible: boolean,
        public price: number,
        public description: string){}
}