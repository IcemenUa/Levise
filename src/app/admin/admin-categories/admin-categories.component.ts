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
  catName = 'firstCat';
  catID = '123';
  newCatName = 'sadsdaCat';
  newCatID = '321';

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
    console.log(this.categoriesArr);

  }

  private addCategory(): void {

    const newCategory = new Category(this.catID, this.catName);
    delete newCategory.id;
    this.categoryService.addCategoryToFB({ ...newCategory }).then(() => this.getCategories)
  }

  private deleteCategory(categoryID): void {
    this.categoryService.deleteCategoryOnFB(categoryID).then(() => this.getCategories)

  }
  private updateCategory(id: string): void {

    const updatedCategory = new Category(id, this.newCatName);

    this.categoryService.updateCategoryOnFB({ ...updatedCategory }).then(() => this.getCategories)

  }

}
