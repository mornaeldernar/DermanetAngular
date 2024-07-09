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
      titulo:'Calendario',
      icono:'nav-icon fas fa-calendar-alt',
      url:"/calendario",
      admin:false
    },
    {
      titulo:'Pacientes',
      icono:'nav-icon fas fa-user-tie',
      url:"/paciente",
      admin:false,
      submenu:[
        {
          titulo:'Ver',
          icono:'nav-icon fas fa-user-tie',
          url:"/paciente",
          admin:false,
        },
        {
          titulo:'Agregar',
          icono:'nav-icon fas fa-user-tie',
          url:"/paciente/new",
          admin:false,
        }
      ]
    },
    {
      titulo:'Doctor',
      icono:'nav-icon fas fa-credit-card',
      url:"/doctor",
      admin:false
    },
  ]
}
