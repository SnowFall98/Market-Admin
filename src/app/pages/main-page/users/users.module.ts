import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { UsersRoutingModule } from './users-routing.module';

//componente
import { UsersComponent } from './users.component';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

//Pipes
import { JsonToStringPipe } from '../../../pipes/json-to-string.pipe';

@NgModule({
  declarations: [UsersComponent, JsonToStringPipe],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
  ]
})
export class UsersModule { }
