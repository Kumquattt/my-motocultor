import { Routes } from '@angular/router';
import { App } from './app';
import { MyRunningOrder } from './my-running-order/my-running-order';

export const routes: Routes = [
  {
    path: '',
    component: MyRunningOrder,
    title: 'My Motocultor 🤘',
  },
];
