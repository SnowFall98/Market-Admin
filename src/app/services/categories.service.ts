import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Icategories } from 'src/app/interface/icategories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  /*=============================================
	Tomar la data de la colección categorías en Firebase
	=============================================*/

  getData(){
    
    return this.http.get(`${environment.urlFirebase}categories.json`);

  }
}
