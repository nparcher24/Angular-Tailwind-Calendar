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
import { format } from 'date-fns';
import { BaseCalComponent } from '../base-cal.component';


@Component({
  selector: 'day-view',
  templateUrl: './day-view.component.html',
})
export class DayViewComponent implements OnInit, AfterViewInit {

  @ViewChild('dayComponent', { static: true }) dayComponent: CalendarWeekViewComponent | undefined
  @Input() viewDate = new Date()
  @Input() events: CalendarEvent[] = []
  @Input() refresh = new Subject<void>();

  days: WeekDay[] = []

  format = format;

  constructor(private changeDetector: ChangeDetectorRef, private baseCal: BaseCalComponent) { }

  ngOnInit(): void {
  }

  updateDate(date: Date) {
    console.log("this")
    this.baseCal.setViewDate(date)
    this.refresh.next()
  }

  ngAfterViewInit(): void {
    // console.log("Day Component: ", this.dayComponent)
    this.days = this.dayComponent?.days ?? []
    console.log(this.days)
    this.changeDetector.detectChanges()
    // this.changeDetector.markForCheck()
  }

  isSelectedDate(selectedDate: Date): boolean {
    if (selectedDate.getFullYear() == this.viewDate.getFullYear() && selectedDate.getMonth() == this.viewDate.getMonth() && selectedDate.getDate() == this.viewDate.getDate()) {
      return true
    } else {
      return false
    }
  }

}
