import { IProductSize } from '../interfaces/productSize.interface';
export class ProductSize implements IProductSize {
    constructor(
        public size: string,
        public available: boolean
    ) { }
}