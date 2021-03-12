import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }




  getProductsFromFB(): Observable<DocumentChangeAction<unknown>[]> {

    return this.firestore.collection('products').snapshotChanges();

  }
  getProductFromFB(id: string): any {

    return this.firestore.collection('products').doc(id).snapshotChanges();

  }

  addProductToFB(product: IProduct): Promise<DocumentReference<unknown>> {

    return this.firestore.collection('products').add(product);

  }

  deleteProductOnFB(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }

  updateProductOnFB(product): Promise<void> {

    return this.firestore.collection('products').doc(product.productID).update(product);

  }
}
