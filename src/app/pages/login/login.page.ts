import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  role: 'manager' | 'staff' | 'merchant' = 'staff';
  name = '';

  constructor(private router: Router, private firestore: Firestore) {}

  async login() {
    if (!this.name) {
      alert('Enter your name');
      return;
    }

    // Check staff collection
    const staffRef = collection(this.firestore, 'staff');
    const q = query(staffRef, where('name', '==', this.name), where('role', '==', this.role));
    const snap = await getDocs(q);

    if (snap.empty) {
      alert('User not found in staff database. Please enter a valid name.');
      return;
    }

    localStorage.setItem('role', this.role);
    localStorage.setItem('name', this.name);

    this.router.navigateByUrl('/dashboard');
  }
}
