import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	Validators,
	FormGroup,
	FormControl,
} from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent implements OnInit {
	form = new FormGroup({
		displayName: new FormControl(""),
		email: new FormControl(""),
		password: new FormControl(""),
	});

	constructor(
		public authService: AuthService,
		private formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			displayName: ["", [Validators.required, Validators.minLength(3)]],
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
					Validators.minLength(9),
				],
			],
		});
	}

	onSubmit() {
		if (this.form.valid) {
			let { email, password, displayName } = this.form.value;
			this.authService.SignUp(email!, password!, displayName!);
		} else {
			Swal.fire({
				title: "Error al registrarse",
				text: "Verifique que no quedo ningun campo vacio y que estos cumplen con la informacion requerida",
				icon: "error",
			});
		}
	}
}
