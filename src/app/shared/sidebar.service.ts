import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[
    {
      titulo:'Dashboard',
      icono:'nav-icon fas fa-tachometer-alt',
      url:"/dashboard/home",
      admin:false
    },
    {
      titulo:'Cliente',
      icono:'nav-icon fas fa-user-tie',
      url:"/cliente",
      admin:true
    },
    {
      titulo:'Cuentas',
      icono:'nav-icon fas fa-credit-card',
      url:"/cuenta",
      admin:false
    },
    {
      titulo:'Pagos',
      icono:'nav-icon fas fa-coins',
      url:"/deposito",
      admin:false
    },
    {
      titulo:'Pago con Tarjeta',
      icono:'nav-icon fas fa-coins',
      url:"/pagoTarjeta/nuevo",
      admin:false
    },
    {
      titulo:'Subir Pagos',
      icono: 'nav-icon fas fa-money-check',
      url: '/deposito/add/file',
      admin:true,
    },
  ]
}
