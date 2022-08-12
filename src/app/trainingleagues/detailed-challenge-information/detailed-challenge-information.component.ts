import {
  Component, OnInit, ViewEncapsulation, Injectable
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatCalendarCellClassFunction
} from '@angular/material/datepicker';
import Swal from 'sweetalert2';

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) { }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -1);
      const end = this._dateAdapter.addCalendarDays(date, 1);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-detailed-challenge-information',
  templateUrl: './detailed-challenge-information.component.html',
  styleUrls: ['./detailed-challenge-information.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DetailedChallengeInformationComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  dateDay: number;

  formFechas = new FormGroup({
    inicio: new FormControl(''),
    final: new FormControl(''),
  })

  constructor(
    private formBuilder: FormBuilder
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.dateDay = currentDay;
    this.minDate = new Date(currentYear, currentMonth, currentDay + 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay + 13);
  }

  ngOnInit(): void {
    this.formFechas = this.formBuilder.group({
      inicio: [
        '',
        [Validators.required]
      ],
      final: ['', [Validators.required] ]
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
      // Highlight the 1st and 20th day of each month.
      return date === this.dateDay || date === this.dateDay + 14 ? 'example-custom-date-class' : '';
    }
    return '';
  };

  diasAgendados() {
    Swal.fire({
      title: "Confirmar",
      icon: "question",
      text: "¿Desea Agendar estos dias para realizar el reto tecnico?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Feliciataciones!',
          'Tu reto se ha agendado con exito, peramos en Sofka Para empezar esta aventura',
          'success'
        )
      }
    });
  }
}
