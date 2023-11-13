import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./video/video.component').then(m => m.VideoComponent)
  },
  {
    path: 'rapport/:id',
    loadComponent: () => import('./rapport/rapport.component').then(m => m.RapportComponent)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
