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
    lastName: new FormControl(''),
  })

  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formRegisterLigue = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          
        ]
      ],
      lastName:[
        '',
        [
          Validators.required,
        ]
      ]
    })
  }

}
