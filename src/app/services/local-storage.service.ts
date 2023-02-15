import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  almacenar(key:string, value:any) {
    localStorage.setItem(key,JSON.stringify(value))
  }
  consultar(key:string){
    let json = localStorage.getItem(key) || "";
    if(json === ""){
      return "";
    } else {
      return JSON.parse(json);
    }
  }
  borrar(key:string){
    localStorage.removeItem(key)
  }
  lipiarTodo(){
    localStorage.clear();
  }
}
