import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

  public platoForm : any;
  public titulo : string = '';
  selectedFile!: File;
  imagenURL: string = ''; // Para mostrar la imagen recuperada
  public platoSeleccionado? : any;
  url = environment.imgUrl;

  constructor( private fb : FormBuilder, private menuService : MenuService, private router: Router,
                private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe( ({id}) => this.cargarPlato( id ) ); 

    this.platoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      // imagen: ['', Validators.required],
      imagen: [null]
    });
    
  }

  //----CARGAR PLATO PARA SAVER SI ES REGISTRAR NUEVO O EDITAR para recuperar--
  cargarPlato(id: number | string){

    if ( id === 'nuevo' ) {
      this.titulo='Registrar Menu';
      return;
    }
    console.log('ENTRA PARA EDITAR_RECUPERAR DATOS');
    this.titulo = 'Actualizar Menu'
    this.menuService.getByIdPlato(Number (id) )
      .subscribe( resp => {

        console.log('DATO RECUPERADO', resp.plato);
        this.platoSeleccionado = resp;
        this.platoForm.patchValue({ 
          nombre: resp.plato.nombre ,
          precio: resp.plato.precio,
          //imagen: resp.plato.imagen,
        });
        // Mostrar la imagen recuperada
        this.imagenURL = `${this.url}/${resp.plato.imagen.split('/').pop()}`;
      },
      error=>{
        console.log(error);
        this.router.navigateByUrl(`/dashboard/menu`);
      }
    );

    // this.titulo='Actualizar Vacaciones';
    // this.vacationservice.getByIDVacations(Number(id)).subscribe( datovacation =>{
    //     this.vacationSeleccionado = datovacation;
    //     console.log('RECUPERA',this.vacationSeleccionado);

    //   // Asigna el tratamiento seleccionado
    //   const selectedVacation = this.userVacation.find(t => t.id === this.vacationSeleccionado.user_id);
    //   console.log('selectedVacation', selectedVacation);
    //   if (selectedVacation) 
    //   {
    //     this.selectedName = selectedVacation.full_name;
    //     // Actualiza el valor del campo de entrada de ng-autocomplete
    //     this.autocompleteInput.query = this.selectedName;
    //     console.log('selectedName', this.selectedName);
    //     this.disponibleVacations = datovacation.entry_date;
    //     this.VacationForm.patchValue({
    //       user_id: datovacation.user_id,
    //       start_date: datovacation.start_date,
    //       end_date: datovacation.end_date,
    //       reason: datovacation.reason,
    //       observations: datovacation.observations
    //     });
    //   }
    // },
    // error=>{
    //   console.log(error);
    //   // this.router.navigateByUrl(`/dashboard/usuario`);
    //   // //Swal.fire('Usuario no actualizado',error.error.msg)
    // }
    //);

  }
  guardarPlato(){

    //const { name } = this.platoForm.value;
    if ( this.platoSeleccionado){
      // Crear FormData para enviar datos al backend
      const formData = new FormData();
      formData.append('nombre', this.platoForm.value.nombre);
      formData.append('precio', this.platoForm.value.precio);
  
      // Solo adjuntar la imagen si se ha seleccionado una nueva
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      }
  
      console.log('LO QUE SE ENVIARÁ PARA ACTUALIZACIÓN:', formData);
  
      // Llamar al servicio para actualizar
      this.menuService.editarPlato(this.platoSeleccionado.plato.id, formData)
        .subscribe(resp => {
          console.log('Plato actualizado:', resp);
          Swal.fire('Actualizado', 'Plato actualizado correctamente', 'success');
          this.router.navigateByUrl(`/dashboard/menu`);
        }, error => {
          console.error('Error al actualizar el plato:', error);
        });
      


    }else {
      //---crear plato nuevo
      if (this.platoForm.invalid) {
        console.log('NO ENVIANDO DATOS_PLATO:!!');
        return;
      }
  
      const formData = new FormData();
      formData.append('nombre', this.platoForm.get('nombre')?.value);
      formData.append('precio', this.platoForm.get('precio')?.value);
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile); // Adjuntar la imagen solo si se selecciona
      }
      console.log('ENVIANDO DATOS_PLATO:!!', formData);
      this.menuService.crearPlato(formData).subscribe(
        (resp) => {
          console.log('RESP_PLATOS==>:', resp);
          Swal.fire('Creado', 'Creado correctamente', 'success');
          this.router.navigateByUrl(`/dashboard/menu`);
        },
        (error) => {
          console.error('Error al crear plato:', error);
          Swal.fire('Error', 'No se pudo crear el plato', 'error');
        }
      );

    }
  }
  cancelar()
  {
    this.router.navigateByUrl(`/dashboard/menu`);
  }
  agregarFoto(data: any){
    console.log(data.url)
    // this.form.get('car_image')?.setValue(data.url);
    // this.imagen = data.file;
    console.log(data)
  }
  //-----PARA AGARRAR LA IMAGEN--
  onFileSelected(event: any) {
    // this.selectedFile = event.target.files[0]; // Guardar la imagen seleccionada
    const file = event.target.files[0]; // Guardar la imagen seleccionada

    if (file) {
      this.selectedFile = file;

      // Vista previa de la nueva imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenURL = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  //---HASTA AQUI-----------------
  
}
