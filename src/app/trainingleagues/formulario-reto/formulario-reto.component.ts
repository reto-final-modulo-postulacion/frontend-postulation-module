import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario-reto',
  templateUrl: './formulario-reto.component.html',
  styleUrls: ['./formulario-reto.component.css']
})
export class FormularioRetoComponent implements OnInit {

  constructor(
    private formBulder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
