import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-reto',
  templateUrl: './formulario-reto.component.html',
  styleUrls: ['./formulario-reto.component.css']
})
export class FormularioRetoComponent implements OnInit {

  formLenguaje = new FormGroup({
    lenguajeUtiliza: new FormControl(''),
  })

  constructor(
    private formBulder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.formLenguaje = this.formBulder.group({
      lenguajeUtiliza: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log(this.formLenguaje.value);
  }
}
