import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusComponent } from './core/campus/campus.component';
import { ExcursionsDisplayComponent } from './core/excursion/features/excursions-display/excursions-display.component';
import { LoginComponent } from './core/participant/features/login/login.component';
import { ParticipantDisplayComponent } from './core/participant/features/participant-display/participant-display.component';
import { RegisterComponent } from './core/participant/features/register/register.component';
import { VillesComponent } from './core/villes/villes.component';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: "", component: ExcursionsDisplayComponent, pathMatch: "full", canActivate: [LoginGuard] },
  { path: "villes", component: VillesComponent, canActivate: [LoginGuard] },
  { path: "campus", component: CampusComponent, canActivate: [LoginGuard] },
  {
    path: "participant", children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
      { path: ":participantId", component: ParticipantDisplayComponent, pathMatch: "full", canActivate: [LoginGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
