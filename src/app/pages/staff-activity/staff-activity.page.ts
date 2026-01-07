import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-staff-activity',
  standalone: true,
  templateUrl: './staff-activity.page.html',
  imports: [IonicModule, CommonModule],
})
export class StaffActivityPage {
  role = localStorage.getItem('role') || 'staff';

  summary$: Observable<{ name: string; count: number }[]>;

  constructor(private router: Router, private firestore: Firestore) {
    const ordersRef = collection(this.firestore, 'orders');
    const orders$ = collectionData(ordersRef) as Observable<any[]>;

    this.summary$ = orders$.pipe(
      map(list => {
        const counts: Record<string, number> = {};

        list.forEach(o => {
          const staffName = o.handledBy || 'Unknown';
          counts[staffName] = (counts[staffName] || 0) + 1;
        });

        return Object.keys(counts).map(name => ({
          name,
          count: counts[name],
        }));
      })
    );
  }

  back() {
    this.router.navigateByUrl('/dashboard');
  }
}
