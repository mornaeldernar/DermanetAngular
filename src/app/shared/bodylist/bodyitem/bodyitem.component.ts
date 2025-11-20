import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-bodyitem',
  templateUrl: './bodyitem.component.html',
  styleUrls: ['./bodyitem.component.scss']
})
export class BodyitemComponent implements OnInit{
  @Input() item:DiagnosticoModel ={name:"",location_text:"",location:"",id:0};
  @Input() micros:number=0;
  @Input() macroId:number=0;
  @Output() getMicro: EventEmitter<any> = new EventEmitter();
  microId:number=0;
  location:string = "";
  ngOnInit(): void {
      this.location = environment.apiUrl+environment.endpoints.image.viewImage+"/"+this.item.id;
      console.log(this.location);
  }
  changeId(microId:number){
    this.getMicro.emit(microId);
  }
}
