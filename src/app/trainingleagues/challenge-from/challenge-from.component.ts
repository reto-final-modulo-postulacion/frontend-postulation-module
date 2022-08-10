import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-challenge-from',
  templateUrl: './challenge-from.component.html',
  styleUrls: ['./challenge-from.component.css']
})
export class ChallengeFromComponent implements OnInit {

  formChallenge = new FormGroup({
     name: new FormControl(''),
     lastname: new FormControl(''),
     country: new FormControl(''),
     state: new FormControl(''),
   })
   constructor(
    public formBuilder: FormBuilder,
  ) {

  }



  ngOnInit(): void {
  }




  onSubmit(customerData: any){
    this.formChallenge.reset();
    console.warn('Your order has been submitted', customerData);
  }

}
