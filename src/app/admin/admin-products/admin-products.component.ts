import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ISubCategory } from 'src/app/shared/interfaces/subCategory.interface';
import { SubCategoriesService } from 'src/app/shared/services/sub-categories.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from '../../shared/services/products.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from 'src/app/shared/models/product.model';
import { ProductDescription } from '../../shared/models/productDescription.model';
import { ProductSize } from '../../shared/models/productSize.model';
import { IProductSize } from 'src/app/shared/interfaces/productSize.interface';
import { IProductDescription } from '../../shared/interfaces/productDescription.interface';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  // available cat subcat and products
  categoriesArr: Array<ICategory>;
  subCategoriesArr: Array<ISubCategory>;
  productArr: Array<IProduct>;

  // product creating 
  productID: string;
  productName: string;
  category: string;
  subCategory: string;
  upload: any;
  mainProductImage: string;
  uploadStatus: boolean;
  imagesUrl: Array<string> = [];
  imageUrl: string;
  productPrice: string;
  // reactive form
  product: FormGroup = new FormGroup({

    
  })

  // Description tesis
  technologiesTesis: string;
  howItFitsTesis: string;
  compositionAndCareTesis: string;

  technologiesTesisArr: Array<string> = [];
  howItFitsTesisArr: Array<string> = [];
  compositionAndCareTesisArr: Array<string> = [];
  //  category changing status
  changeStatus: boolean;

  // available sizes
  xsSizeAvailable = false
  sSizeAvailable = false;
  mSizeAvailable = false;
  lSizeAvailable = false;
  xlSizeAvailable = false;
  xxlSizeAvailable = false;

  // newProduct: IProduct

  constructor(private productsService: ProductsService, private subCategoryService: SubCategoriesService, private categoryService: CategoriesService, private AngularFireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getCategories(), this.getSubCategories()
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

  uploadImage(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    this.upload = this.AngularFireStorage.upload(filePath, file);

    this.upload.then(image => {

      this.AngularFireStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {

        const imageUrl = url;
        this.uploadStatus = true;
        event.target.files = null;
        this.imagesUrl.push(imageUrl);
        console.log(this.imagesUrl);

      });

    });
  }

  addTechnologiesTesis(): void {
    this.technologiesTesisArr.push(this.technologiesTesis)
    this.technologiesTesis = ''
  }

  addHowItFitsTesis(): void {
    this.howItFitsTesisArr.push(this.howItFitsTesis)
    this.howItFitsTesis = ''
  }

  addCompositionAndCareTesis(): void {
    this.compositionAndCareTesisArr.push(this.compositionAndCareTesis)
    this.compositionAndCareTesis = ''
  }

  addProduct(): void {
    const description = new ProductDescription(this.technologiesTesisArr, this.howItFitsTesisArr, this.compositionAndCareTesisArr);
    const xs = new ProductSize('XS', this.xsSizeAvailable);
    // const s = new ProductSize('S', this.sSizeAvailable);
    // const m = new ProductSize('M', this.mSizeAvailable);
    // const l = new ProductSize('L', this.lSizeAvailable);
    // const xl = new ProductSize('XL', this.xlSizeAvailable);
    // const xxl = new ProductSize('XXL', this.xxlSizeAvailable);
    const sizes: Array<IProductSize> = [];
    // sizes.push(xs, s, m, l, xl, xxl);
    sizes.push(Object.assign({}, xs));
    console.log(sizes);
    console.log(description);

    const newProduct = new Product(this.productID, this.category, this.subCategory, this.productName, this.imagesUrl, [...sizes], { ...description }, this.productPrice);
    console.log(newProduct);

    // const newProduct = new Product('1', 'this.category', 'this.subCategory', 'this.productName', 'this.imagesUrl', 'sizes', description, this.productPrice);
    delete newProduct.id
    this.productsService.addProductToFB({ ...newProduct }).then(() => this.getCategories)
  }




}
