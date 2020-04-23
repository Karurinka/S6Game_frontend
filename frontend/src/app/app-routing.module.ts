import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from "./components/user/user.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { LobbyComponent } from "./components/lobby/lobby.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
