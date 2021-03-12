import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ISubCategory } from '../../../shared/interfaces/subCategory.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  leftMenuOpen: boolean;
  subCategoriesMenuOpen: boolean;
  categoriesArr: Array<ICategory>;
  subCategoriesArr: Array<ISubCategory> = [];
  constructor(private categoryService: CategoriesService, private firestore: AngularFirestore) { }

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

  getSubCategories(categoryName: string): void {
    this.subCategoriesArr = [];
    this.firestore.collection('subCategories').ref.where('category', '==', categoryName).onSnapshot(
      snap => {
        snap.forEach(prodData => {
          const data = prodData.data() as ISubCategory;
          const id = prodData.id;
          this.subCategoriesArr.push({ id, ...data });
        });
      }
    );

  }

  openSubCategoriesMenu(categoryName: string): void {
    this.subCategoriesMenuOpen = true;
    this.getSubCategories(categoryName)
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

  closeAllMenus(): void {
    this.leftMenuOpen = false;
    this.subCategoriesMenuOpen = false;
  }

}


