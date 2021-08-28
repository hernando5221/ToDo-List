import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.component.html',
  styleUrls: ['./create-tareas.component.css']
})
export class CreateTareasComponent implements OnInit {
createTarea:FormGroup;
submitted=false;
loadin=false;
id:string | null;
titulo='TASKS';

  constructor(private fb: FormBuilder,
    private tareaSer:TareasService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute:ActivatedRoute //clase nos ayuda si el id es null nuevo, si es strig es editar
    ) { 

    this.createTarea=this.fb.group({
      nombre:['',Validators.required]
    })

    //se captura el id a editar
    this.id =  this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.editarTareauno();
  }

  addtarea(){
    
    const tarea1:any={
      nombre: this.createTarea.value.nombre,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loadin=true;
    this.tareaSer.agregarTareas(tarea1).then(()=>{
    this.toastr.success('Task Registered, Successfully','Aggregate Record');
    this.loadin=false;
      this.router.navigate(['/list-tareas'])
    })
  }

  agregarEditarTarea(){
    if(this.id===null){
      this.addtarea();
    }else{
      this.editarTarea(this.id);
    }
  }

  editarTarea(id:string){
    
    const tarea1:any={
      nombre: this.createTarea.value.nombre,
      fechaActualizacion: new Date()
    }
    this.loadin=true;

    this.tareaSer.updateTarea(id,tarea1).then(()=>{
      this.loadin=false;
      this.toastr.info('successfully updated task','modified task')
    })
    this.router.navigate(['/list-tareas'])
  }


  editarTareauno(){
    
    //si el id es null nuevo, si es strig es editar
    if(this.id !== null){
      this.loadin=true;
      this.tareaSer.getTareauno(this.id).subscribe(data=>{
        console.log(data.payload.data()['nombre']);
        this.loadin=false;
        //setValue para rellenar los campos
        this.createTarea.setValue({
          nombre: data.payload.data()['nombre']
        })
      })
    }

  }

}
