import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostico.form',
  templateUrl: './diagnostico.form.component.html',
  styleUrls: ['./diagnostico.form.component.scss']
})
export class DiagnosticoFormComponent {
  error:boolean=false;
  diagnostico: FormGroup;
  constructor(private fb: FormBuilder,
    private router : Router
  ) {
    this.diagnostico = this.fb.group({
      name: ['',[Validators.required]]
    })
  }
  save(){}
}
