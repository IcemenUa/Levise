import { ISubCategory } from '../interfaces/subCategory.interface';
export class SubCategory implements ISubCategory {

    constructor(
        public id: string,
        public name: string,
        public category: string,
        
    ) { }



}