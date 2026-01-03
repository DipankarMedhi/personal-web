import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DailyBytesComponent } from './daily-bytes/daily-bytes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'daily-bytes', component: DailyBytesComponent }
];
