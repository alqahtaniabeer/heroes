import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageoneComponent } from './view/pages/page-one/pageone.component';
import { PagetwoComponent } from './view/pages/page-two/pagetwo.component';

const routes: Routes = [
  { 
    path: 'page-one', 
    component: PageoneComponent
  },
  { 
    path: 'page-two', 
    component: PagetwoComponent 
  },
  {path: '', redirectTo: '/page-one', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
