import { Component, Input, OnInit } from '@angular/core';
import { CalendarMonthViewComponent } from 'angular-calendar';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';
import { BaseCalComponent } from '../base-cal.component';


@Component({
  selector: 'month-view',
  templateUrl: './month-view.component.html',
})
export class MonthViewComponent implements OnInit {

  @Input() viewDate = new Date()
  @Input() events: CalendarEvent[] = []
  @Input() refresh = new Subject<void>();
  @Input() showEvents = true;
  constructor(private baseCal: BaseCalComponent) { }

  ngOnInit(): void {
  }

  updateDate(date: Date) {
    this.baseCal.setViewDate(date)
  }

  isSelectedDate(selectedDate: Date): boolean {
    if (selectedDate.getFullYear() == this.viewDate.getFullYear() && selectedDate.getMonth() == this.viewDate.getMonth() && selectedDate.getDate() == this.viewDate.getDate()) {
      return true
    } else {
      return false
    }
  }

  isToday(selectedDate: Date): boolean {
    let today = new Date()
    if (selectedDate.getFullYear() == today.getFullYear() && selectedDate.getMonth() == today.getMonth() && selectedDate.getDate() == today.getDate()) {
      return true
    } else {
      return false
    }
  }

}

