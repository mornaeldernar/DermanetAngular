import { Component, Input } from '@angular/core';
import {MicroModel } from 'src/app/models/micro.model';

@Component({
  selector: 'app-microlist',
  templateUrl: './microlist.component.html',
  styleUrls: ['./microlist.component.scss']
})
export class MicrolistComponent {
  @Input() items:MicroModel[] = [];
  @Input() cuantos:number=0;
  @Input() total:number=0;
  constructor(){

  }

}
