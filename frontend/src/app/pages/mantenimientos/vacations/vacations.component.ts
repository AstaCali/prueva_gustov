import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from 'src/app/services/vacation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {

  // public userVacation : any;
  public userVacation: any[] = []; // Inicializar como un array vacío
  keyword='full_name'; // La palabra de búsqueda que se mostrará en el campo
  // keyword ='name';
  public VacationForm : any;
  public disponibleVacations : number = 0;
  public vacationSeleccionado : any; // para almacenar lo recuperado
  public selectedName : string ='';
  public titulo : string = '';

  @ViewChild('autocompleteInput', { static: true }) autocompleteInput: any;

  constructor( private fb : FormBuilder, private vacationservice : VacationService, private router: Router,
                private activatedRoute: ActivatedRoute
  ){}
  

  ngOnInit(): void {

    //this.cargarUserVacations();
    //---Para obtener losa datos para editar--
    this.activatedRoute.params
    .subscribe( ({id}) => this.cargarVacation( id ) ); 

    this.VacationForm = this.fb.group({
      user_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      reason: ['', Validators.required],
      observations: ['', Validators.required],
    });
    
  }

  cargarUserVacations(){
    this.vacationservice.cargarUserVacation().subscribe(data=>{
      this.userVacation = data;
      console.log('LLEGA_#', this.userVacation);
    });
  }

  selectTrabajadorEvent(item : any) {
    console.log("SELECCIONO#:",item);

     //this.selectedTreatmentName = item.name_treatment;//---USAR EN CASO QUE SALGA ERROR--PARA MOSTRAR LO RECUPERADO
     this.VacationForm.patchValue({
      user_id: item.id,
    });
    this.disponibleVacations = item.entry_date;
  }

  guardarVacation(){

    const { name } = this.VacationForm.value;

    if(this.vacationSeleccionado){

      console.log('entro estos datos para editar', this.vacationSeleccionado);

      const data= {
        ...this.VacationForm.value,
        id: this.vacationSeleccionado.id
      }
      console.log('Lo que se nviara para editar', data);
      this.vacationservice.putVacation(data). subscribe( resp=>{
        Swal.fire('Actualizando',`${ name } actualizado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/vacation`);
      });
    }else{

      console.log('ENVIANDO DATOS_Vacation:!!',this.VacationForm.value);
    
      this.vacationservice.crearVacation(this.VacationForm.value)
      .subscribe(resp => {
        console.log('RESP:', resp);
        Swal.fire('Creado', 'Creado correctamente', 'success');
        this.router.navigateByUrl(`/dashboard/vacation`);
      },
      error=>{
        //alert(error.error.message);
        Swal.fire('Error', error.error.message, 'error');
      }
    );

    }
  }

  //----CARGAR VACATIONES PARA EDITAR Y RCUPERAR--
  cargarVacation(id: number | string){

    if ( id === 'nuevo' ) {
      this.titulo='Registrar Vacaciones';
      return;
    }

    this.titulo='Actualizar Vacaciones';
    this.vacationservice.getByIDVacations(Number(id)).subscribe( datovacation =>{
       this.vacationSeleccionado = datovacation;
       console.log('RECUPERA',this.vacationSeleccionado);

      // Asigna el tratamiento seleccionado
      const selectedVacation = this.userVacation.find(t => t.id === this.vacationSeleccionado.user_id);
      console.log('selectedVacation', selectedVacation);
      if (selectedVacation) 
      {
        this.selectedName = selectedVacation.full_name;
        // Actualiza el valor del campo de entrada de ng-autocomplete
        this.autocompleteInput.query = this.selectedName;
        console.log('selectedName', this.selectedName);
        this.disponibleVacations = datovacation.entry_date;
        this.VacationForm.patchValue({
          user_id: datovacation.user_id,
          start_date: datovacation.start_date,
          end_date: datovacation.end_date,
          reason: datovacation.reason,
          observations: datovacation.observations
        });
      }
    },
    error=>{
      console.log(error);
      // this.router.navigateByUrl(`/dashboard/usuario`);
      // //Swal.fire('Usuario no actualizado',error.error.msg)
    }
  );

  }

  cancelar()
  {
    this.router.navigateByUrl(`/dashboard/vacation`);
  }
}
