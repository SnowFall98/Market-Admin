import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  /*=============================================
  Tomar la data de la colección Mensajes en Firebase
  =============================================*/

  getData(){

    return this.http.get(`${environment.urlFirebase}messages.json`);
  } 

  /*=============================================
  Tomar un item de la data colección Mensajes en Firebase
  =============================================*/

  getItem(id: string) {

    return this.http.get(`${environment.urlFirebase}messages/${id}.json`);
    
  } 

  /*=============================================
  Actualizar información 
  =============================================*/

  patchData(id:string, data:object){

    return this.http.patch(`${environment.urlFirebase}messages/${id}.json`, data);

  }
}
