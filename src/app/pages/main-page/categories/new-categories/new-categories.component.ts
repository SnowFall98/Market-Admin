import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { CategoriesService } from 'src/app/services/categories.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { ImagesService } from 'src/app/services/images.service';
import { Icategories } from 'src/app/interface/icategories';
import { alerts } from 'src/app/helpers/alerts';

@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.css']
})
export class NewCategoriesComponent implements OnInit {

  /*=============================================
	Creamos grupo de controles
	=============================================*/

  public f = this.form.group({

    icon:['', Validators.required],
    image:['', Validators.required],
		name:['', { validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ ]*') ], asyncValidators: [this.isRepeatCategory()], updateOn: 'blur'}],
    titleList:[[], [Validators.required, Validators.pattern('["\\[\\]\\-\\,\\0-9a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')]]

  })

  /*=============================================
	Variable que valida el envío del formulario
	=============================================*/

  formSubmitted = false;

  /*=============================================
	Validación personalizada
	=============================================*/

  get name() { return this.f.controls.name }
  get image() { return this.f.controls.image }
  get titleList() { return this.f.controls.titleList }
  get icon() { return this.f.controls.icon }

  /*=============================================
	Variable global que almacena la imagen temporal
	=============================================*/

  imgTemp = "";

	/*=============================================
	Visualizar la url
	=============================================*/

  urlInput = "";

	/*=============================================
	Configuración Mat Chips: Etiquetas dentro del Input Title List
	=============================================*/

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /*=============================================
	Adicionar Chips
	=============================================*/

  add(event: MatChipInputEvent): void{

    const input = event.input;
	    
    const value = event.value;

    if((value || '').trim()){

      this.f.controls.titleList.value.push(value.trim());

    }

    if(input) {
      
      input.value = '';

    }

    this.f.controls.titleList.updateValueAndValidity();

  }

  /*=============================================
	Remover Chips
	=============================================*/

  remove(title:any):void {

    const index = this.f.controls.titleList.value.indexOf(title);

    if(index >= 0) {

      this.f.controls.titleList.value.splice(index, 1);

    }

    this.f.controls.titleList.updateValueAndValidity();

  }

  /*=============================================
	Visualizar el icono
	=============================================*/

  iconView= "";

  /*=============================================
	Subir la imagen al servidor
	=============================================*/

  uploadFile = "";

  /*=============================================
	Variable para precarga
	=============================================*/

  loadData = false;


  constructor(private form: FormBuilder, private categoriesServices: CategoriesService, private imageService: ImagesService) { }

  ngOnInit(): void {
  }

  /*=============================================
	Función Save Category
	=============================================*/

  saveCategory(){

    this.loadData = true;

    /*=============================================
		Validamos que el formulario haya sido enviado
		=============================================*/

    this.formSubmitted = true;

    /*=============================================
		Validamos que el formulario esté correcto
		=============================================*/

    if (this.f.invalid) {

      return;

    }

    /*=============================================
    Subir imagen al servidor
    =============================================*/

    this.imageService.uploadImage(this.uploadFile, "categories", "", 170, 170, null).subscribe((resp:any)=>{

      if(resp.status == 20){

        const dataCategory: Icategories = {

          icon:this.f.controls.icon.value.split('"')[1],
          image:resp.result,
          name:this.f.controls.name.value,
          title_list:JSON.stringify(this.f.controls.titleList.value),
          url:this.urlInput,
          view:0,
          state:"hidden"

        }
        
				/*=============================================
				Guardar en base de datos la info de la categoría
				=============================================*/

        this.categoriesServices.postData(dataCategory).subscribe(

          resp =>{

            this.loadData = false;

            alerts.basicAlert("Ok", 'The category', "success")

          },

          err => {

            this.loadData = false;

            alerts.basicAlert("Error", 'Category saving error', "error")

          }

        )

      }else {

        this.loadData = false;

        alerts.basicAlert("Error", 'Invalid Picture', "error")

      }

    })

  }

  
	/*=============================================
	Validamos formulario
	=============================================*/

  invalidField(field:string){

    return functions.invalidField(field, this.f, this.formSubmitted);

  }

  /*=============================================
	Validar que el nombre de categoría no se repita
	=============================================*/

  isRepeatCategory(){

    return (control: AbstractControl ) => {

      const name = functions.createUrl(control.value);

      return new Promise((resolve)=>{

        this.categoriesServices.getFilterData("url", name).subscribe(

          resp =>{

            if(Object.keys(resp).length > 0){

              resolve({category: true})

            } else {

              this.urlInput = name;

            }
            
          }

        )

      })

    }

  }

  /*=============================================
	Visualizar el Icono
	=============================================*/

  viewIcon(e:any) {

    this.iconView = e.target.value;

    e.target.value = this.f.controls.icon.value.split('"')[1];

  }

}
