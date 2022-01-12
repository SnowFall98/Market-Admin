import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { CategoriesRoutingModule } from './categories-routing.module';

//componente
import { CategoriesComponent } from './categories.component';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';

//pipes
import { PipesModule } from '../../../pipes/pipes.module';
import { NewCategoriesComponent } from './new-categories/new-categories.component';

@NgModule({
  declarations: [CategoriesComponent, NewCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PipesModule,
    MatDialogModule
  ]
})
export class CategoriesModule { }
