import { IProductDescription } from '../interfaces/productDescription.interface';
export class ProductDescription implements IProductDescription {
    constructor(
        public technologies: Array<string>,
        public HowItFits: Array<string>,
        public CompositionAndCare: Array<string>
    ) { }
}