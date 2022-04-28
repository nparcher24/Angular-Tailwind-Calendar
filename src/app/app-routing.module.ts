import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseCalComponent } from './base-cal/base-cal.component';
import { DayViewComponent } from './base-cal/day-view/day-view.component';
import { MonthViewComponent } from './base-cal/month-view/month-view.component';
import { WeekViewComponent } from './base-cal/week-view/week-view.component';
import { YearViewComponent } from './base-cal/year-view/year-view.component';

const routes: Routes = [
  {
    path: '', component: BaseCalComponent, children: [
      {
        path: 'month', component: MonthViewComponent
      },
      {
        path: 'day', component: DayViewComponent
      },
      {
        path: 'week', component: WeekViewComponent
      },
      {
        path: 'year', component: YearViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
