import { Injectable } from "@angular/core";
import * as auth from "firebase/auth";
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../authentication/interfaces/Interface.User";
import { Router } from "@angular/router";

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
		// this.onlySesion();
	}

	SignUp(email: any, password: any) {
		return this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				this.SetUserData(result.user);
				this.router.navigate(["list/home"]);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	SignIn(email: string, password: string) {
		return this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				localStorage.setItem("user", JSON.stringify(this.userData));
				this.SetUserData(result.user);
				this.router.navigate(["list/home"]);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	SignOut() {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem("user");
			this.router.navigate(["auth/login"]);
		});
	}

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

	AuthLogin(provider: any) {
		return this.afAuth
			.signInWithPopup(provider)
			.then((result) => {
				this.SetUserData(result.user);
				this.router.navigate(["list/home"]);
			})
			.catch((error) => {
				window.alert(error);
			});
	}

	SetUserData(user: any) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`,
		);
		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
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
