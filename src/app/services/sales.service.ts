import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http:HttpClient) { }

  /*=============================================
  Tomar la data de la colección órdenes en Firebase
  =============================================*/

  getData(){

    return this.http.get(`${environment.urlFirebase}sales.json`);

  }

  /*=============================================
  Tomar data filtrada de la colección categorías en Firebase
  =============================================*/

  getFilterData(orderBy:string, equalTo:string){

    return this.http.get(`${environment.urlFirebase}sales.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);

  }

  /*=============================================
  Actualizar en Firebase Database con Autenticación
  =============================================*/

  patchDataAuth(id:string, value: object, idToken:any){

    return this.http.patch(`${environment.urlFirebase}sales/${id}.json?auth=${idToken}`,value);
    
  }
}
