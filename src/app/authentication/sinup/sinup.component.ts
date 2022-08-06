import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void { }

}
