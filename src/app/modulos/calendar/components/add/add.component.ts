import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: []
})
export class AddDialogComponent {
  @Input() horario:string="";

  constructor(
  ) {}
  close(): void {
  }
}
