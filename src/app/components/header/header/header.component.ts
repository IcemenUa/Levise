import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from '../../../shared/interfaces/category.interface';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  leftMenuOpen: boolean;
  subCategoriesMenuOpen: boolean;
  categoriesArr: Array<ICategory>;

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


  leftMenuToggle(): void {

    if (this.subCategoriesMenuOpen) {
      this.subCategoriesMenuOpen = false;
    }
    this.leftMenuOpen = !this.leftMenuOpen
  }
  subCategoriesMenuToggle(): void {
    this.subCategoriesMenuOpen = !this.subCategoriesMenuOpen
  }

  closeAllMenus():void{
    this.leftMenuOpen = false;
    this.subCategoriesMenuOpen = false;
  }

}


