import { IProductDescription } from './productDescription.interface';
import { IProductSize } from './productSize.interface';

export interface IProduct {
    id: string,
    category: string,
    subCategory: string,
    name: string,
    photos: Array<string>,
    sizes: Array<IProductSize>,
    description: IProductDescription,
    price: string
}