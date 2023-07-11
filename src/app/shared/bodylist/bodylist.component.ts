import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { MacroModel } from 'src/app/models/macro.model';

@Component({
  selector: 'app-bodylist',
  templateUrl: './bodylist.component.html',
  styleUrls: ['./bodylist.component.scss']
})
export class BodylistComponent {
  @Input() items:MacroModel[] = [];
  @Input() cuantos:number=0;
  @Input() total:number=0;
  @Input() page:number=0;
  @Input() first:boolean=true;
  @Input() last:boolean=true;
  @Output() getMicro: EventEmitter<any> = new EventEmitter();
  constructor(){

  }
  changeMicroId(microId:number){
    console.log("list micro id: "+microId)
    this.getMicro.emit(microId);
  }
}
