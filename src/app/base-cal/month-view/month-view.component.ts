import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CalendarMonthViewComponent } from 'angular-calendar';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';
import { BaseCalComponent, CalendarViewType } from '../base-cal.component';


@Component({
  selector: 'month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-override.css']
})
export class MonthViewComponent implements OnInit {
  @Input() activeDay = new Date(2022, 12, 6)
  @Input() viewDate = new Date()
  @Input() events: CalendarEvent[] = []
  @Input() refresh = new Subject<void>();
  @Input() showEvents = true;
  tooSmallForEvents = false;

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    if (event.target.innerWidth < 650) {
      this.tooSmallForEvents = false;
    } else {
      this.tooSmallForEvents = true;
    }
    // console.log(event.target.innerWidth);
  }

  constructor(private baseCal: BaseCalComponent) { }

  ngOnInit(): void {
    if (window.innerWidth < 650) {
      this.tooSmallForEvents = false;
    } else {
      this.tooSmallForEvents = true;
    }
  }

  updateDate(date: Date) {
    this.baseCal.setViewDate(date)
    this.baseCal.view = CalendarViewType.Day

    this.activeDay = date

    this.refresh.next()
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

