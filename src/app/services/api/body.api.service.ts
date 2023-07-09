import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BodyitemDto } from 'src/app/models/dto/bodyitem.dto';
''

@Injectable({
  providedIn: 'root'
})
export class BodyApiService {

  constructor(private http : HttpClient) { }

  bodyitem:BodyitemDto[]=[
    {
      titulo:'Cabeza',
      icono:'https://cdn-icons-png.flaticon.com/512/6669/6669489.png',
      url:"#",
      total:3,
      fecha:new Date()
    },
    {
      titulo:'Cabeza',
      icono:'https://cdn-icons-png.flaticon.com/512/6669/6669489.png',
      url:"#",
      total:5,
      fecha:new Date()
    },
    {
      titulo:'Cabeza',
      icono:'https://cdn-icons-png.flaticon.com/512/6669/6669489.png',
      url:"#",
      total:1,
      fecha:new Date()
    },
  ]

  getElements(pacienteId:number) {
    return this.bodyitem;
  }
}
