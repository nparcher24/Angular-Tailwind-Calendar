import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseCalComponent } from './base-cal/base-cal.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MonthViewComponent } from './base-cal/month-view/month-view.component';
import { DayViewComponent } from './base-cal/day-view/day-view.component';
import { WeekViewComponent } from './base-cal/week-view/week-view.component';
import { YearViewComponent } from './base-cal/year-view/year-view.component'


@NgModule({
  declarations: [
    AppComponent,
    BaseCalComponent,
    MonthViewComponent,
    DayViewComponent,
    WeekViewComponent,
    YearViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
