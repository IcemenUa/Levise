import { Injectable } from '@angular/core';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';



@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private firestore: AngularFirestore) { }


  getCategoriesFromFB(): Observable<DocumentChangeAction<unknown>[]> {

    return this.firestore.collection('categories').snapshotChanges();

  }

  addCategoryToFB(category: ICategory): Promise<DocumentReference> {

    return this.firestore.collection('categories').add(category);

  }

  deleteCategoryOnFB(id: string): Promise<void> {
    return this.firestore.collection('categories').doc(id).delete();
  }

  updateCategoryOnFB(category: ICategory): Promise<void> {

    return this.firestore.collection('categories').doc(category.id).update(category);

  }

}
