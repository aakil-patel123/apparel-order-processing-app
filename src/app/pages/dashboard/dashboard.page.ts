import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

import { Device } from '@awesome-cordova-plugins/device/ngx';

type Order = { status: string };

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './dashboard.page.html',
  providers: [Device],
})
export class DashboardPage {
  role = localStorage.getItem('role') || 'staff';
  name = localStorage.getItem('name') || '';

  orders$: Observable<Order[]>;
  total$!: Observable<number>;
  pending$!: Observable<number>;
  completed$!: Observable<number>;

  constructor(private router: Router, private firestore: Firestore, private device: Device) {
    const ordersRef = collection(this.firestore, 'orders');
    this.orders$ = collectionData(ordersRef) as Observable<Order[]>;

    this.total$ = this.orders$.pipe(map(list => list.length));
    this.pending$ = this.orders$.pipe(map(list => list.filter(o => o.status === 'Pending').length));
    this.completed$ = this.orders$.pipe(map(list => list.filter(o => o.status === 'Completed').length));

    console.log('Device Platform:', this.device.platform);
    console.log('Device UUID:', this.device.uuid);
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
