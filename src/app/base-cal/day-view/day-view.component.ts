import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import {
  CalendarDayViewComponent,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
} from 'angular-calendar';
import { WeekDay } from 'calendar-utils';
import { Subject } from 'rxjs';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { BaseCalComponent } from '../base-cal.component';



@Component({
  selector: 'day-view',
  templateUrl: './day-view.component.html',
})
export class DayViewComponent implements OnInit {

  @Input() viewDate = new Date()
  @Input() events: CalendarEvent[] = []
  @Input() refresh = new Subject<void>();
  dateSelectionDate = this.viewDate

  days: WeekDay[] = []

  format = format;

  constructor(private changeDetector: ChangeDetectorRef, private baseCal: BaseCalComponent) { }

  ngOnInit(): void {
    this.setDays()
  }

  updateDate(date: Date) {
    console.log("this")
    this.baseCal.setViewDate(date)
    this.refresh.next()
  }



  isSelectedDate(selectedDate: Date): boolean {
    if (selectedDate.getFullYear() == this.viewDate.getFullYear() && selectedDate.getMonth() == this.viewDate.getMonth() && selectedDate.getDate() == this.viewDate.getDate()) {
      return true
    } else {
      return false
    }
  }


  incrementMonth(increase: boolean) {
    if (increase) {
      this.baseCal.setViewDate(new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1)));
    } else {
      this.baseCal.setViewDate(new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1)));
    }
    this.refresh.next()
  }

  incrementWeek(increase: boolean) {
    if (increase) {
      this.baseCal.setViewDate(new Date(this.viewDate.setDate(this.viewDate.getDate() + 7)))
    } else {
      this.baseCal.setViewDate(new Date(this.viewDate.setDate(this.viewDate.getDate() - 7)))
    }
    this.setDays()
  }

  setDays() {
    const weekDays: WeekDay[] = [];
    const start = startOfWeek(this.baseCal.viewDate);
    const end = endOfWeek(this.baseCal.viewDate);
    eachDayOfInterval({ start, end }).forEach(day => {
      const newDay: WeekDay = {
        date: day,
        day: day.getDate(),
        isPast: day < new Date(),
        isToday: this.isToday(day),
        isFuture: day > new Date(),
        isWeekend: false,
        cssClass: "string"
      }
      weekDays.push(newDay);
    });

    this.days = weekDays
    this.changeDetector.detectChanges()
    this.refresh.next()
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
