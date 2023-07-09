import { Component, Input } from '@angular/core';

import { BodyApiService } from '../../services/api/body.api.service';
import { BodyitemDto } from 'src/app/models/dto/bodyitem.dto';

@Component({
  selector: 'app-bodylist',
  templateUrl: './bodylist.component.html',
  styleUrls: ['./bodylist.component.scss']
})
export class BodylistComponent {
  @Input() items:BodyitemDto[] = [];
  constructor(){

  }
}
