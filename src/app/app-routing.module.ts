import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'


const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationModule) 
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
