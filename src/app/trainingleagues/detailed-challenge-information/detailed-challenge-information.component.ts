import {
 Component, OnInit, EventEmitter, Output, Renderer2, ViewChild
} from '@angular/core';
import { MatCalendar } from "@angular/material/datepicker";

@Component({
  selector: 'app-detailed-challenge-information',
  templateUrl: './detailed-challenge-information.component.html',
  styleUrls: ['./detailed-challenge-information.component.css']
})
export class DetailedChallengeInformationComponent implements OnInit {

  selected = new Date(2022, 8, 9);
  minDate= new Date(2022, 8, 9);
  maxDate= new Date(2022, 8, 15);

  @Output()
  dateSelected: EventEmitter<Date> = new EventEmitter();

  @Output()
  monthSelected: EventEmitter<Date> = new EventEmitter();

  @ViewChild('calendar', { static: true })
  calendar: any;


  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.selected = new Date(2022, 8, 10);
  }

}
