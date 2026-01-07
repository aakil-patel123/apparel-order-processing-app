import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Device } from '@awesome-cordova-plugins/device/ngx';

type Order = {
  orderId: string;
  customerName: string;
  itemName: string;
  quantity: number;
  status: string;
};

type Staff = {
  staffId: string;
  name: string;
  role: string;
};

type Merchant = {
  merchantId: string;
  companyName: string;
  contact: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [Device],
})
export class HomePage {
  // Firebase reads
  orders$: Observable<Order[]>;
  staff$: Observable<Staff[]>;
  merchants$: Observable<Merchant[]>;

  // Form fields (interactive add order)
  newCustomer = '';
  newItem = '';
  newQty: number | null = null;

  constructor(private firestore: Firestore, private device: Device) {
    // 1) Orders
    const ordersRef = collection(this.firestore, 'orders');
    this.orders$ = collectionData(ordersRef) as Observable<Order[]>;

    // 2) Staff
    const staffRef = collection(this.firestore, 'staff');
    this.staff$ = collectionData(staffRef) as Observable<Staff[]>;

    // 3) Merchants
    const merchantsRef = collection(this.firestore, 'merchants');
    this.merchants$ = collectionData(merchantsRef) as Observable<Merchant[]>;

    // Cordova Device plugin logs
    console.log('Device Platform:', this.device.platform);
    console.log('Device UUID:', this.device.uuid);
  }

  async addOrder() {
    if (!this.newCustomer || !this.newItem || !this.newQty) {
      alert('Please fill all fields');
      return;
    }

    const ordersRef = collection(this.firestore, 'orders');

    await addDoc(ordersRef, {
      orderId: 'ORD' + Math.floor(Math.random() * 10000),
      customerName: this.newCustomer,
      itemName: this.newItem,
      quantity: this.newQty,
      status: 'Pending',
    });

    // Clear form
    this.newCustomer = '';
    this.newItem = '';
    this.newQty = null;
  }
}
