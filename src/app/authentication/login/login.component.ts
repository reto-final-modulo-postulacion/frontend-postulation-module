import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	form = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	constructor(
		public authService: AuthService,
		public formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			email: [
				"",
				[
					Validators.required,
					Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
				],
			],
			password: [
				"",
				[
					Validators.required,
					Validators.pattern(
						/^(?=(?:.*[A-Z].*){2})(?!(?:.*[A-Z].*){3,})(?=(?:.*\d.*){3})(?!(?:.*\d.*){4,})(?=(?:.*[!@#\$%\^&\*]){2})(?=.{9,}).*$/,
					),
				],
			],
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			let { email, password } = this.form.value;
			this.authService.SignIn(email!, password!);
		}

		Swal.fire({
			title: "Error al Iniciar Sesion",
			icon: "error",
			text: "Verifique que los datos ingresados son correctos y vuelva a intentarlo o verifique que este registrado",
			confirmButtonText: "Aceptar",
		});
	}
}
