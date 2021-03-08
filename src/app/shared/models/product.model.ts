import { IProduct } from "../interfaces/product.interface";
import { IProductDescription } from "../interfaces/productDescription.interface";
import { IProductSize } from '../interfaces/productSize.interface';

export class Product implements IProduct {
   
    constructor(
        public id: string,
        public category: string,
        public subCategory: string,
        public name: string,
        public photos: Array<string>,
        public sizes: Array<IProductSize>,
        public description: IProductDescription,
        public price: string,
    ) { }

} 