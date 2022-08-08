import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action-password',
  templateUrl: './action-password.component.html',
  styleUrls: ['./action-password.component.css']
})
export class ActionPasswordComponent implements OnInit {

  fromPasswordReset = new FormGroup({
    password: new FormControl(''),
    checketPassword: new FormControl('')
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fromPasswordReset = this.fb.group({
      password:
        [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=(?:.*[A-Z].*){2})(?!(?:.*[A-Z].*){3,})(?=(?:.*\d.*){3})(?!(?:.*\d.*){4,})(?=(?:.*[!@#\$%\^&\*]){2})(?=.{9,}).*$/)
          ]
        ],
      checketPassword:
        [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=(?:.*[A-Z].*){2})(?!(?:.*[A-Z].*){3,})(?=(?:.*\d.*){3})(?!(?:.*\d.*){4,})(?=(?:.*[!@#\$%\^&\*]){2})(?=.{9,}).*$/)
          ]
        ]
    });
  }

  onChangePassword(): void{
    if( this.fromPasswordReset.valid){
      // let { email, password } = this.form.value;
      // this.authService.SignIn(email!, password!);
    }

    Swal.fire({
      title: 'Error al Iniciar Sesion',
      icon: 'error',
      text: 'Verifique que los datos ingresados son correctos y vuelva a intentarlo o verifique que este registrado',
      confirmButtonText: 'Aceptar'
    });
  }

}
