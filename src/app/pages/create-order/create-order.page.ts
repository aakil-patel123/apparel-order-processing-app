import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

type Merchant = { companyName: string };

@Component({
  standalone: true,
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateOrderPage {
  customerName = '';
  itemName = '';
  size = '';
  color = '';
  quantity: number | null = null;
  merchantPartner = '';

  staffName = localStorage.getItem('name') || 'Staff';

  merchants$: Observable<Merchant[]>;

  constructor(private router: Router, private firestore: Firestore) {
    const merchantsRef = collection(this.firestore, 'merchants');
    this.merchants$ = collectionData(merchantsRef) as Observable<Merchant[]>;
  }

  async saveOrder() {
    if (!this.customerName || !this.itemName || !this.size || !this.color || !this.quantity || !this.merchantPartner) {
      alert('Fill all fields');
      return;
    }

    const ordersRef = collection(this.firestore, 'orders');
    await addDoc(ordersRef, {
      orderId: 'ORD' + Math.floor(Math.random() * 10000),
      customerName: this.customerName,
      itemName: this.itemName,
      size: this.size,
      color: this.color,
      quantity: this.quantity,
      merchantPartner: this.merchantPartner,
      handledBy: this.staffName,
      status: 'Pending',
      createdAt: Date.now(),
    });

    this.router.navigateByUrl('/orders');
  }

  back() {
    this.router.navigateByUrl('/dashboard');
  }
}
