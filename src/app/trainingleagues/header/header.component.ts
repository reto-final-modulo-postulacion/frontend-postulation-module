import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	showMenu: any = true;
	showOptionsUser: any = false;

	constructor(public authService: AuthService) {}

	ngOnInit(): void {}

	openMenu() {
		(!this.showMenu) ? this.showMenu = true : this.showMenu = false;
	}

	openOptionsUser() {
		(
			!this.showOptionsUser
		) ? this.showOptionsUser = true : this.showOptionsUser = false;
	}
}
