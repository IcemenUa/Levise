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
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  // available cat subcat and products
  categoriesArr: Array<ICategory>;
  subCategoriesArr: Array<ISubCategory>;
  productArr: Array<any>

  // product creating 

  // form

  productForm = this.formBuilder.group({
    "productCategory": ["", [Validators.required]],
    "productSubCategory": ["", [Validators.required]],
    "productID": ["", [Validators.required]],
    "productName": ["", [Validators.required, Validators.pattern("[a-zA-Z](3, 15)")]],
    "productImages": this.formBuilder.array([]),
    "productPrice": ["", [Validators.required]],

  })
  SizesForm = this.formBuilder.group({
    "XS": [false, [Validators.required]],
    "S": [false, [Validators.required]],
    "M": [false, [Validators.required]],
    "L": [false, [Validators.required]],
    "XL": [false, [Validators.required]],
    "XXL": [false, [Validators.required]],
  })
  AboutProductForm = this.formBuilder.group({
    "description": ['', Validators.required],
    "howItFits": this.formBuilder.array([
      ['', Validators.required]
    ]),
    "compositionAndCare": this.formBuilder.array([
      ['', Validators.required]
    ]),
  })


  productID: string;
  product: any;
  upload: any;
  uploadStatus: boolean;
  imagesUrl: Array<string> = [];




  //  category changing status
  changeStatus: boolean;



  // newProduct: IProduct

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private subCategoryService: SubCategoriesService, private categoryService: CategoriesService, private AngularFireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getCategories(), this.getSubCategories(), this.getProducts()
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
  private getProducts(): void {
    this.productsService.getProductsFromFB().subscribe(
      collection => {
        this.productArr = collection.map(category => {
          const data = category.payload.doc.data() as any;
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
        (<FormArray>this.productForm.controls["productImages"]).push(new FormControl(imageUrl, Validators.required));
      });

    });
  }





  addTesis(position): void {
    if (position === 'howItFits') {
      (<FormArray>this.AboutProductForm.controls["howItFits"]).push(new FormControl("", Validators.required));
    };
    if (position === 'compositionAndCare') {
      (<FormArray>this.AboutProductForm.controls["compositionAndCare"]).push(new FormControl('', Validators.required));
    }
    (<FormArray>this.AboutProductForm.controls["compositionAndCare"])
    console.log(this.AboutProductForm.controls["howItFits"]);

  }



  addProduct(): void {

    delete this.productForm.value.productID
    const product = {
      ...this.productForm.value,
      ...this.SizesForm.value,
      ...this.AboutProductForm.value,
    }


    this.productsService.addProductToFB({ ...product }).then(() => this.getCategories)



    console.log(product);
    this.clearForms()

  }

  private deleteProduct(productID): void {
    this.productsService.deleteProductOnFB(productID).then(() => this.getProducts)

  }

  private getProductData(id: string, product: any): void {

    this.changeStatus = !this.changeStatus
    this.productID = id;
    this.product = product;
    console.log(this.product);
    this.productForm = this.formBuilder.group({
      "productCategory": [product.productCategory, [Validators.required]],
      "productSubCategory": [product.productSubCategory, [Validators.required]],
      "productID": [id, [Validators.required]],
      "productName": [product.productName, [Validators.required, Validators.pattern("[a-zA-Z](3, 15)")]],
      "productImages": this.formBuilder.array([]),
      "productPrice": [product.productPrice, [Validators.required]],

    })

    this.SizesForm = this.formBuilder.group({
      "XS": [product.XS, [Validators.required]],
      "S": [product.S, [Validators.required]],
      "M": [product.M, [Validators.required]],
      "L": [product.L, [Validators.required]],
      "XL": [product.XL, [Validators.required]],
      "XXL": [product.XXL, [Validators.required]],
    })

    this.AboutProductForm = this.formBuilder.group({
      "description": [product.description, Validators.required],
      "howItFits": this.formBuilder.array([]),
      "compositionAndCare": this.formBuilder.array([]),
    })
    for (let i = 0; i < product.howItFits.length; i++) {
      (<FormArray>this.AboutProductForm.controls["howItFits"]).push(new FormControl(product.howItFits[i], Validators.required));


    }
    for (let i = 0; i < product.compositionAndCare.length; i++) {
      (<FormArray>this.AboutProductForm.controls["compositionAndCare"]).push(new FormControl(product.compositionAndCare[i], Validators.required));

    }
  }


  private updateProduct(): void {
    const newProduct = {
      ...this.productForm.value,
      ...this.SizesForm.value,
      ...this.AboutProductForm.value,
    }

    this.productsService.updateProductOnFB({ ...newProduct }).then(() => this.getProducts);

    this.changeStatus = false;
    this.clearForms()

  }
  private clearForms(): void {
    this.productForm.reset();
    this.SizesForm.reset();
    this.AboutProductForm.reset();
  }

}


