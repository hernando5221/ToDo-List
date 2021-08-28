import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private firestore:AngularFirestore) { }

  agregarTareas(tarea:any):Promise<any>{
    return this.firestore.collection('tareas').add(tarea)
  }

  getTarea(): Observable<any> {
    return this.firestore.collection('tareas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarTarea(id:string): Promise<any>{
    return this.firestore.collection('tareas').doc(id).delete();
  }

  getTareauno(id:string): Observable<any>{
    return this.firestore.collection('tareas').doc(id).snapshotChanges();
  }

  updateTarea(id:string, data:any): Promise<any>{
    return this.firestore.collection('tareas').doc(id).update(data);
  }
}
