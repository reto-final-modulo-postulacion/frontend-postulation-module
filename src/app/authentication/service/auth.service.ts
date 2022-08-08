import { Injectable } from "@angular/core";
import * as auth from "firebase/auth";
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../interfaces/Interface.User";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	userData: any;

	constructor(
		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
	) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.userData = user;
				localStorage.setItem("user", JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem("user")!);
			} else {
				localStorage.setItem("user", "null");
				JSON.parse(localStorage.getItem("user")!);
			}
		});
	}

	// Registrar Usuario
	SignUp(email: string, password: string, displayName: string) {
		return this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				this.SetUserData(result.user, displayName);
				this.router.navigate(["list/home"]);
			})
			.catch(() => {
				Swal.fire({
					title: "Usuario Registrado",
					icon: "warning",
					text: "El usuario ya se encuentra registrado con anterioridad",
					confirmButtonText: "Aceptar",
				});
			});
	}
	// Recuperar contraseña
	async ForgotPassword(passwordResetEmail: string) {
		return await this.afAuth
			.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				Swal.fire({
					title: 'Correo Enviado',
					icon: 'success',
					text: 'Se envio un correo de electronico para cambiar su contraseña, por favir verifique su correo electronico',
					confirmButtonText: 'Aceptar'
				}).then(result => {
					if (result.isConfirmed)
						this.router.navigate(["auth/login"]);

					this.router.navigate(["auth/login"]);
				});
			})

	}

	// Veificacion del codigo del correo
	async verifyPasswordResetCode(code: string): Promise<any> {
		return await this.afAuth
			.verifyPasswordResetCode(code)
			.then((email) => {
				return email;
			}).catch(() => {
				Swal.fire({
					title: 'Codigo explirado',
					icon: 'error',
					text: `El link actual con el cual intenta cambiar la contraseña ha expirado, 
						vuelva ha solicitar un nuevo link para cambiar la contraseña`,
					confirmButtonText: 'Aceptar'
				}).then(result => {
					if (result.isConfirmed)
						this.router.navigate(["auth/login"]);

					this.router.navigate(["auth/login"]);
				});
			});
	}

	// Confirmacion del reset de la contraseña
	async confirmPasswordReset(code: string, newPassword: string): Promise<boolean> {
		return await this.afAuth
			.confirmPasswordReset(code, newPassword)
			.then(() => {
				this.router.navigate(["auth/login"]);
				return true;
			}).catch((error) => {
				window.alert(error.message);
				return false;
			});
	}

	// Iniciar sesion email/oaswird
	async SignIn(email: string, password: string) {
		return await this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				localStorage.setItem("user", JSON.stringify(this.userData));
				this.SetUserData(result.user);
				this.router.navigate(["list/home"]);
			})
			.catch(() => {
				Swal.fire({
					title: "Usuario invalido",
					icon: "error",
					text: "Correo o Contraseña Incorrectos, verifique que los datos ingresados son validos y vuelva a intentarlo.",
					confirmButtonText: "Aceptar",
				});
			});
	}

	// Salir Sesion
	async SignOut() {
		return await this.afAuth.signOut().then(() => {
			localStorage.removeItem("user");
			this.router.navigate(["auth/login"]);
		});
	}

	// Iniciar sesion con google
	async GoogleAuth() {
		return await this.AuthLogin(new auth.GoogleAuthProvider()).then(() => {
			this.afAuth.onAuthStateChanged((user) => {
				if (user) {
					localStorage.setItem("user", JSON.stringify(this.userData));
					this.router.navigate(["list/home"]);
				}
			});
		});
	}

	// Logica de atenticacion para ejecutar los proveedores automaticos.
	AuthLogin(provider: any) {
		return this.afAuth
			.signInWithPopup(provider)
			.then((result) => {
				this.SetUserData(result.user);
				this.router.navigate(["list/home"]);
			})
			.catch((error) => {
				Swal.fire({
					title: "Error",
					icon: "error",
					text: error,
				});
			});
	}

	// Configuracion de inicio de sesion
	SetUserData(user: any, displayName?: string) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`,
		);
		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName || displayName,
		};
		return userRef.set(userData, {
			merge: true,
		});
	}

	onlySesion() {
		this.afAuth.onAuthStateChanged((user) => {
			console.log("El Estado del useario a cambiado");
			console.log(user);
		});
	}
}
