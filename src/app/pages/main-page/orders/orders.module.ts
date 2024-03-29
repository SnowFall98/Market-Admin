import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//ruta
import { OrdersRoutingModule } from './orders-routing.module';

//componente
import { OrdersComponent } from './orders.component';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import { MatChipsModule} from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';

//pipes
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';

@NgModule({
  declarations: [OrdersComponent, EditOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    PipesModule
  ]
})
export class OrdersModule { }
