import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

type Order = {
  orderId: string;
  customerName: string;
  itemName: string;
  quantity: number;
  status: string;
  handledBy: string;
  merchantPartner: string;
};

@Component({
   selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.page.html',
  imports: [IonicModule, CommonModule],
})
export class OrdersPage {
  orders$: Observable<Order[]>;

  constructor(private router: Router, private firestore: Firestore) {
    const ordersRef = collection(this.firestore, 'orders');
    // include idField so we can update status
    this.orders$ = collectionData(ordersRef, { idField: 'docId' }) as Observable<any[]>;
  }

  back() {
    this.router.navigateByUrl('/dashboard');
  }

  openManifest(order: any) {
    this.router.navigate(['/manifest', order.docId]);
  }

  async nextStatus(order: any) {
    const newStatus =
      order.status === 'Pending' ? 'In Progress' :
      order.status === 'In Progress' ? 'Completed' :
      'Completed';

    await updateDoc(doc(this.firestore, 'orders', order.docId), { status: newStatus });
  }
}
