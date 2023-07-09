import { Component, Input } from '@angular/core';
import { BodyitemDto } from 'src/app/models/dto/bodyitem.dto';

@Component({
  selector: 'app-bodyitem',
  templateUrl: './bodyitem.component.html',
  styleUrls: ['./bodyitem.component.scss']
})
export class BodyitemComponent {
  @Input() item:BodyitemDto={titulo:"",url:"",icono:"",total:0,fecha:new Date()};
}
