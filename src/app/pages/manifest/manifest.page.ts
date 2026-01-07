import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './manifest.page.html',
})
export class ManifestPage {
  order$!: Observable<any>;
  docId = '';

  constructor(private route: ActivatedRoute, private router: Router, private firestore: Firestore) {
    this.docId = this.route.snapshot.paramMap.get('id') || '';
    const orderRef = doc(this.firestore, 'orders', this.docId);
    this.order$ = docData(orderRef);
  }

  back() {
    this.router.navigateByUrl('/orders');
  }

  print() {
    window.print(); // browser print -> save as PDF
  }
}
