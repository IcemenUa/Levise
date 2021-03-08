import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categoriesArr: Array<ICategory>
  catName: string;
  catID: string;
  changeStatus: boolean
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories()
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

  addCategory(): void {

    const newCategory = new Category(this.catID, this.catName.toUpperCase());
    delete newCategory.id;
    this.categoryService.addCategoryToFB({ ...newCategory }).then(() => this.getCategories)
    this.clearInputs()
  }

  private deleteCategory(categoryID): void {
    this.categoryService.deleteCategoryOnFB(categoryID).then(() => this.getCategories)

  }

  private getCategoryData(id: string, name: string): void {
    this.changeStatus = !this.changeStatus
    this.catID = id
    this.catName = name
  }


  private updateCategory(id: string, name: string): void {


    const updatedCategory = new Category(id, this.catName.toUpperCase());

    this.categoryService.updateCategoryOnFB({ ...updatedCategory }).then(() => this.getCategories);

    this.changeStatus = false;
    this.clearInputs()

  }
  private clearInputs(): void {
    this.catName = ''
    this.catID = ''
  }

}
