import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManifestPageRoutingModule } from './manifest-routing.module';

import { ManifestPage } from './manifest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManifestPageRoutingModule
  ],
  declarations: [ManifestPage]
})
export class ManifestPageModule {}
