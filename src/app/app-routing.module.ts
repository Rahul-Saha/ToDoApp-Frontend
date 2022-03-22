import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoHomeComponent } from './to-do-home/to-do-home.component';

const routes: Routes = [{
  path: '',
  component: ToDoHomeComponent,
  children: [
    {
      path: 'to-do',
      component: ToDoHomeComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
