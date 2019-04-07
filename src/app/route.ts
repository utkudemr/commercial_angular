import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import { CardComponent } from './card/card.component';


export const  appRoutes:Routes=
[
    {path:"category", component:CategoryComponent},
    {path:"user", component:CustomerComponent},
    {path:"product/:id",component:ProductComponent},
    {path:"card/:id",component:CardComponent},
    {path:"",redirectTo:"user",pathMatch:"full"},
];