import { Component, OnInit } from "@angular/core";
import { User } from "firebase/auth";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	showMenu: boolean = false;
	showOptionsUser: boolean = false;
	user: any;

	constructor() {}

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
		this.user = JSON.parse(localStorage.getItem("user")!);
		console.log(this.user);
	}
}
