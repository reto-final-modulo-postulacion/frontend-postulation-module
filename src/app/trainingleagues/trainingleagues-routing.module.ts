import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTrainigLeaguesComponent } from './list-trainig-leagues/list-trainig-leagues.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'home', component: ListTrainigLeaguesComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  declarations: [
    ListTrainigLeaguesComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class TrainingleaguesRoutingModule { }