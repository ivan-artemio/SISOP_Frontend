import { Component, EventEmitter, Input, Output, OnInit, Inject, Optional } from '@angular/core';
import { Area, ClaveValor, Dependencia } from '../../../../shared/interface/dependencia';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalDependenciaService } from '../../../../shared/services/global-dependencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar-dependencia',
  templateUrl: './agregar-dependencia.component.html',
  styleUrls: ['./agregar-dependencia.component.scss'],
  providers: [MessageService],
})
export class AgregarDependenciaComponent implements OnInit {

  updateId: string = '';

  areasDependencia: Area[] | null = null;
  loading: boolean = true;

  selectedMulti: any[] = [];
  display: boolean = false;
  editable: boolean = false;

  nombreFormControl: FormControl;
  rfcFormControl: FormControl;
  responsableFormControl: FormControl;
  direccionFormControl: FormControl;
  telefonoFormControl: FormControl;
  acronimoFormControl: FormControl;

  agregarDependenciaForm: FormGroup = new FormGroup({});
  datosDependencia: Dependencia;
  
  filter: any;

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalDependenciaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService, 
  ) {

    // # VALIDACIONES DE FORMULARIOS - - - - - - - - - - - - - - -

    this.nombreFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.rfcFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.responsableFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.direccionFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.telefonoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.acronimoFormControl = new FormControl('', [
      Validators.required,
    ]);
    
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const id = params['id']; // El ID es una cadena o 'undefined' si no se proporciona
      this.updateId = id;
      // Crear el formulario
      this.agregarDependenciaForm = this.formBuilder.group({
        nombre: this.nombreFormControl,
        rfc: this.rfcFormControl,
        responsable: this.responsableFormControl,
        direccion: this.direccionFormControl,
        telefono: this.telefonoFormControl,
        acronimo: this.acronimoFormControl
      });

      if (id) {
        //console.log("ID proporcionado:", id);
        this.editable = true

        // obtener y mostrar datos
        this.globalService.getDependenciaById(id).subscribe(
          {
            next: (datos) => {
              // insertar datos en el formulario
             //console.log(datos)
             this.nombreFormControl.setValue(datos.name);
             this.rfcFormControl.setValue(datos.rfc);
             this.responsableFormControl.setValue(datos.responsible);
             this.direccionFormControl.setValue(datos.address);
             this.telefonoFormControl.setValue(datos.phone);
             this.acronimoFormControl.setValue(datos.acronym);
            },
            error: (error) => {
              
            }
          }
        );

      }else{

      }
      
    });



  }


  // ? FUNCTIONS - - - - -

  agregar(){
    if (this.agregarDependenciaForm.valid) {
      this.globalService.agregarDependencias(this.agregarDependenciaForm.value).subscribe({
        next: (response) => {
          //validar que response se un numero y mayor a cero
          if(typeof response.id === 'number' && response.id >= 0){
            this.messageService.add({ severity: 'success', summary: '¡Dependendencia agregada con éxito!', life: 3000 });
            //limpiar formulario
            this.agregarDependenciaForm.reset();
          }else{
            this.messageService.add({ severity: 'error', summary: 'No se pudo agregar la dependencia', detail: 'Intente más tarde', life: 3000 });
          }
        },
        error: (e) => console.error(e),
      })
    }else{
      console.log('Revise el formulario')
      // Marcar todos los controles como tocados para que se muestren los mensajes de error
      Object.keys(this.agregarDependenciaForm.controls).forEach(field => {
        const control = this.agregarDependenciaForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
    
  }

  actualizar(){
    
    if (this.agregarDependenciaForm.valid) {
      this.globalService.actualizarDependencia(this.agregarDependenciaForm.value, this.updateId).subscribe({
        next: (response) => {
          if(response.success){
            this.messageService.add({ severity: 'success', summary: '¡Dependendencia actualizada con éxito!', life: 3000 });
            
          }else{
            this.messageService.add({ severity: 'error', summary: 'No se pudo actualizar la dependencia', detail: 'Intente más tarde', life: 3000 });
          }
        },
        error: (e) => console.error(e),
        //complete: () => console.info('complete') 
      })
    }else{
      console.log('Revise el formulario')
      // Marcar todos los controles como tocados para que se muestren los mensajes de error
      Object.keys(this.agregarDependenciaForm.controls).forEach(field => {
        const control = this.agregarDependenciaForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
  }

  volver(){
    this.router.navigate(['/dashboard/dependencias']);
  }
  

}
