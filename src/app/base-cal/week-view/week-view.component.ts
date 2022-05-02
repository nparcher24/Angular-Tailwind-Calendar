import { Component, OnInit, Input } from '@angular/core';
import { CalendarMonthViewComponent } from 'angular-calendar';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';

@Component({
  selector: 'week-view',
  templateUrl: './week-view.component.html',
})
export class WeekViewComponent implements OnInit {

  @Input() viewDate = new Date()
  @Input() events: CalendarEvent[] = []
  @Input() refresh = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event)
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

}
