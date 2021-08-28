import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TareasService } from '../../services/tareas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tareas',
  templateUrl: './list-tareas.component.html',
  styleUrls: ['./list-tareas.component.css']
})
export class ListTareasComponent implements OnInit {
tarea2: any[]=[];
  

  constructor(private tareaServe:TareasService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTareas2();
  }

  getTareas2(){
    this.tareaServe.getTarea().subscribe(data =>{
      this.tarea2=[];
      data.forEach((element:any) => {

        //llegar al id de los valores
        //console.log(element.payload.doc.id);

        //para llegar a los valores es data
        //console.log(element.payload.doc.data());
        
        this.tarea2.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.tarea2);
    });
  }

  eliminarTareas(id:string){
    this.tareaServe.eliminarTarea(id).then(()=>{
      console.log('Tarea eliminada con exito')
      this.toastr.error('Task was Successfully Removed','Record Deleted')
    })
  }

}
