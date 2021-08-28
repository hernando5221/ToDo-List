import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTareasComponent } from './components/create-tareas/create-tareas.component';
import { ListTareasComponent } from './components/list-tareas/list-tareas.component';

const routes: Routes = [
  {path: 'list-tareas', component: ListTareasComponent},
  {path: 'createTarea', component: CreateTareasComponent},
  {path: 'editTarea/:id', component: CreateTareasComponent},
  {path: '**', redirectTo: 'list-tareas', pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
