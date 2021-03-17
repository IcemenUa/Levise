import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminSubCategoriesComponent } from './admin/admin-sub-categories/admin-sub-categories.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePageComponent },
  { path: 'shop/:category/:subCategory', component: ShopComponent,},
  { path: 'productDetails/:productCategory/:productSubCategory/:prodID', component: ProductDetailComponent },

  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'adminHome', component: AdminHomePageComponent },
      { path: 'adminCategories', component: AdminCategoriesComponent },
      { path: 'adminSubCategories', component: AdminSubCategoriesComponent },
      { path: 'AdminProducts', component: AdminProductsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
