import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisputesService {

  constructor(private http:HttpClient) { }

  /*=============================================
  Tomar la data de la colección disputas en Firebase
  =============================================*/

  getData(){

    return this.http.get(`${environment.urlFirebase}disputes.json`);
  } 

  /*=============================================
  Tomar un item de la data colección disputas en Firebase
  =============================================*/

  getItem(id: string) {

    return this.http.get(`${environment.urlFirebase}disputes/${id}.json`);
    
  } 

  /*=============================================
  Actualizar información 
  =============================================*/

  patchData(id:string, data:object){

    return this.http.patch(`${environment.urlFirebase}disputes/${id}.json`, data);

  }
}
