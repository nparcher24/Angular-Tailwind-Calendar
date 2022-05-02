import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, ChangeDetectorRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  format,
  getDate,

} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewComponent,
} from 'angular-calendar';
import { WeekDay } from 'calendar-utils';
import { ActivatedRoute, Router } from '@angular/router';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export enum CalendarViewType {
  Year = "Year",
  Week = "Week",
  Month = "Month",
  Day = "Day"
}

@Component({
  selector: 'app-base-cal',
  templateUrl: './base-cal.component.html',
})


export class BaseCalComponent implements OnInit {



  view: CalendarViewType = CalendarViewType.Month;
  CalendarViewType = CalendarViewType;
  viewDate: Date = new Date();
  viewDateString = "Today";
  showView = false;
  weekViewHeaderDays: WeekDay[] = [];

  calViewString = ""

  something = CalendarMonthViewComponent

  constructor(private route: ActivatedRoute, private router: Router, private changeDetector: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.udpateCalViewString()
    console.log(this.something)
  }

  udpateCalViewString() {
    switch (this.view) {
      case CalendarViewType.Day: {
        this.calViewString = format(this.viewDate, "MMM dd yyyy")
        break;
      };
      case CalendarViewType.Month: {
        this.calViewString = format(this.viewDate, "MMMM, yyyy");
        break;
      };
      case CalendarViewType.Week: {
        this.calViewString = format(this.viewDate, "MMM dd yyyy");
        break;
      }
      case CalendarViewType.Year: {
        this.calViewString = format(this.viewDate, "yyyy");
        break;
      }
    }
  }

  changeView(toView: CalendarViewType) {
    this.view = toView;
    this.updateViewString()
    this.udpateCalViewString()
    this.showView = false;
  }

  setViewDate(newDate: Date) {
    console.log("CALLED")
    this.viewDate = newDate
    this.updateViewString()
    this.udpateCalViewString()
    this.refresh.next()
  }




  incrementViewDate(increase: boolean) {
    if (increase) {
      switch (this.view) {
        case CalendarViewType.Day: {
          this.viewDate.setDate(this.viewDate.getDate() + 1);
          break;
        };
        case CalendarViewType.Month: {
          this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
          break;
        };
        case CalendarViewType.Week: {
          this.viewDate.setDate(this.viewDate.getDate() + 7);
          break;
        }
        case CalendarViewType.Year: {
          this.viewDate.setDate(this.viewDate.getFullYear() + 1);
          break;
        }
      }
    } else {
      switch (this.view) {
        case CalendarViewType.Day: {
          this.viewDate.setDate(this.viewDate.getDate() - 1);
          break;
        };
        case CalendarViewType.Month: {
          this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
          break;
        };
        case CalendarViewType.Week: {
          this.viewDate.setDate(this.viewDate.getDate() - 7);
          break;
        }
        case CalendarViewType.Year: {
          this.viewDate.setDate(this.viewDate.getFullYear() - 1);
          break;
        }
      }
    }
    this.updateViewString()
    this.udpateCalViewString()
    this.refresh.next()
    console.log('VIEWDATE: ', this.viewDate)
  }

  updateViewString() {
    console.log(this.viewDate)
    let today = new Date()

    let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    let todayBroken = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (tomorrow.getFullYear() == this.viewDate.getFullYear() && tomorrow.getMonth() == this.viewDate.getMonth() && tomorrow.getDate() == this.viewDate.getDate()) {
      console.log("TOMORROW"); // date2 is one day after date1.
      this.viewDateString = "Tomorrow"

    } else if (yesterday.getFullYear() == this.viewDate.getFullYear() && yesterday.getMonth() == this.viewDate.getMonth() && yesterday.getDate() == this.viewDate.getDate()) {
      console.log("YESTERDAY"); // date2 is one day after date1.
      this.viewDateString = "Yesterday"
    } else if (todayBroken.getFullYear() == this.viewDate.getFullYear() && todayBroken.getMonth() == this.viewDate.getMonth() && todayBroken.getDate() == this.viewDate.getDate()) {
      console.log("TODAY"); // date2 is one day after date1.
      this.viewDateString = "Today"
    } else {
      this.viewDateString = format(this.viewDate, 'dd MMM, yyyy');
    }


    // if (this.viewDate.getDate() === today) {
    //   this.viewDateString = "Today"
    // } else if (today + 1 === this.viewDate.getDate()) {
    // this.viewDateString = "Tomorrow"
    // } else if (today - 1 === this.viewDate.getDate()) {
    //   this.viewDateString = "Yesterday"
    // } else {
    //   this.viewDateString = format(this.viewDate, 'dd MMM, yyyy');
    // }
    // console.log(this.viewDateString)
  }

  selectToday() {
    this.viewDate = new Date()
    this.updateViewString()
    this.udpateCalViewString()
  }

  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'move',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event)
      }
    },
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
        console.log(event)

      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
        console.log(event)

      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(startOfDay(new Date()), 4),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(startOfDay(new Date()), 7),
      end: addHours(startOfDay(new Date()), 9),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(startOfDay(new Date()), 12),
      end: addHours(startOfDay(new Date()), 13),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
  ];



  activeDayIsOpen: boolean = true;



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarViewType) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }



}
