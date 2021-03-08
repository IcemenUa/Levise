import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ISubCategory } from '../interfaces/subCategory.interface';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {


  constructor(private firestore: AngularFirestore) { }


  getSubCategoriesFromFB(): Observable<DocumentChangeAction<unknown>[]> {

    return this.firestore.collection('subCategories').snapshotChanges();

  }

  addSubCategoryToFB(subCategory: ISubCategory): Promise<DocumentReference> {

    return this.firestore.collection('subCategories').add(subCategory);

  }

  deleteSubCategoryOnFB(id: string): Promise<void> {
    return this.firestore.collection('subCategories').doc(id).delete();
  }

  updateSubCategoryOnFB(subCategory: ISubCategory): Promise<void> {

    return this.firestore.collection('subCategories').doc(subCategory.id).update(subCategory);

  }

}
