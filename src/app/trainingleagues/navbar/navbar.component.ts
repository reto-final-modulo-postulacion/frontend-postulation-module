import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	showMenu: boolean = false;
	showOptionsUser: boolean = false;

	user: any;

	constructor(public authService: AuthService) {}

	ngOnInit(): void {
		this.getDataUserLocal();
	}
	openMenu() {
		(!this.showMenu) ? this.showMenu = true : this.showMenu = false;
	}

	openOptionsUser() {
		(
			!this.showOptionsUser
		) ? this.showOptionsUser = true : this.showOptionsUser = false;
	}

	getDataUserLocal() {
		this.authService.afAuth.onAuthStateChanged((user) => {
			if (user) {
				this.user = user;
			}
		});
	}
}
