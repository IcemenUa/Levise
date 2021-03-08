import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { SubCategoriesService } from '../../shared/services/sub-categories.service';
import { ISubCategory } from 'src/app/shared/interfaces/subCategory.interface';
import { SubCategory } from 'src/app/shared/models/subCategory.model';
import { ICategory } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-admin-sub-categories',
  templateUrl: './admin-sub-categories.component.html',
  styleUrls: ['./admin-sub-categories.component.scss']
})
export class AdminSubCategoriesComponent implements OnInit {

  categoriesArr: Array<ICategory>
  subCategoriesArr: Array<ISubCategory>
  subCatName: string;
  subCatID: string;
  category:string;
  changeStatus: boolean;

  constructor(private subCategoryService: SubCategoriesService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getSubCategories(),this.getCategories()
  }


  private getCategories(): void {
    this.categoryService.getCategoriesFromFB().subscribe(
      collection => {
        this.categoriesArr = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }


  private getSubCategories(): void {
    this.subCategoryService.getSubCategoriesFromFB().subscribe(
      collection => {
        this.subCategoriesArr = collection.map(category => {
          const data = category.payload.doc.data() as ISubCategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  addSubCategory(): void {

    const newCategory = new SubCategory(this.subCatID, this.subCatName.toUpperCase(), this.category);
    delete newCategory.id;
    this.subCategoryService.addSubCategoryToFB({ ...newCategory }).then(() => this.getSubCategories)
    this.subCatName = ''
    this.subCatID = ''
  }

  private deleteSubCategory(categoryID): void {
    this.subCategoryService.deleteSubCategoryOnFB(categoryID).then(() => this.getSubCategories)

  }

  private getSubCategoryData(id: string, name: string): void {
    this.changeStatus = !this.changeStatus
    this.subCatID = id
    this.subCatName = name
  }


  private updateSubCategory(id: string, name: string): void {


    const updatedCategory = new SubCategory(id, this.subCatName.toUpperCase(), this.category);

    this.subCategoryService.updateSubCategoryOnFB({ ...updatedCategory }).then(() => this.getSubCategories);

    this.changeStatus = false;
    this.subCatID = '';
    this.subCatName = '';

  }


}