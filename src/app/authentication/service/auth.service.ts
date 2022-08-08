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
			.catch((error) => {
				console.log(error);
				Swal.fire({
					title: "Usuario Registrado",
					icon: "warning",
					text: "El usuario ya se encuentra registrado con anterioridad",
					confirmButtonText: "Aceptar",
				});
			});
	}
	// Recuperar contraseña
	ForgotPassword(passwordResetEmail: string) {
		return this.afAuth
			.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				window.alert("Password reset email sent, check your inbox.");
			})
			.catch((error) => {
				window.alert(error);
			});
	}
	// Iniciar sesion email/oaswird
	SignIn(email: string, password: string) {
		return this.afAuth
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
	SignOut() {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem("user");
			this.router.navigate(["auth/login"]);
		});
	}

	// Iniciar sesion con google
	GoogleAuth() {
		return this.AuthLogin(new auth.GoogleAuthProvider()).then(() => {
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
