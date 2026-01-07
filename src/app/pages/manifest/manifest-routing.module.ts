import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManifestPage } from './manifest.page';

const routes: Routes = [
  {
    path: '',
    component: ManifestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManifestPageRoutingModule {}
