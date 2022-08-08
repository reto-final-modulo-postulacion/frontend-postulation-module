import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-action-password',
  templateUrl: './action-password.component.html',
  styleUrls: ['./action-password.component.css']
})
export class ActionPasswordComponent implements OnInit {

  private code: string = '';
  protected codeExpiration: boolean = true;

  fromPasswordReset = new FormGroup({
    password: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router
      .queryParams
      .subscribe(params => {
        this.code = params['oobCode'];
        if (this.code) {
          this.authService
            .verifyPasswordResetCode(this.code)
            .then((email) => {
              if (email) {
                this.codeExpiration = false;
                this.fromPasswordReset = this.fb.group({
                  password:
                    ['', [
                      Validators.required,
                      Validators.pattern(/^(?=(?:.*[A-Z].*){2})(?!(?:.*[A-Z].*){3,})(?=(?:.*\d.*){3})(?!(?:.*\d.*){4,})(?=(?:.*[!@#\$%\^&\*]){2})(?=.{9,}).*$/)
                    ]]
                });
              }
            })
        }else {
          this.codeExpiration = true;
        }
      })


  }

  onChangePassword(): void {
    if (this.fromPasswordReset.valid) {
      this.authService
        .confirmPasswordReset(this.code, this.fromPasswordReset.value.password!)
        .then(() => {
          Swal.fire({
            title: 'Contraseña Actualizada',
            icon: 'success',
            text: 'La contraseña ha sido actualizada con exito',
            confirmButtonText: 'Aceptar'
          });
        })
    }
    else {
      Swal.fire({
        title: 'Error al cambiar la contraseña',
        icon: 'error',
        text: 'Verifique que la contraseña ingresada que el link sea valido o La contraseña sea valida',
        confirmButtonText: 'Aceptar'
      });
    }

  }

}
