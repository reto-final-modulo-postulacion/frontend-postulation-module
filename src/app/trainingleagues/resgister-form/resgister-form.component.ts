import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resgister-form',
  templateUrl: './resgister-form.component.html',
  styleUrls: ['./resgister-form.component.css']
})
export class ResgisterFormComponent implements OnInit {

  formRegisterLigue = new FormGroup({
    name: new FormControl(''),
  })

  constructor(
    public FormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formRegisterLigue = this.FormBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.max(5)
        ]
      ]
    })
  }

}
