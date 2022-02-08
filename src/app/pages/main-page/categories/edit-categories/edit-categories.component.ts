import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { CategoriesService } from 'src/app/services/categories.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { ImagesService } from 'src/app/services/images.service';
import { Icategories } from 'src/app/interface/icategories';
import { alerts } from 'src/app/helpers/alerts';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface IDialogData{
	id:string;
}

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {

  /*=============================================
	Creamos grupo de controles
	=============================================*/

  public f = this.form.group({

    icon:['', Validators.required],
    image:''

  })

  /*=============================================
	Variable que valida el envío del formulario
	=============================================*/

  formSubmitted = false;

  /*=============================================
	Validación personalizada
	=============================================*/

  get image() { return this.f.controls.image }
  get icon() { return this.f.controls.icon }

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
  imgTemp = "";
  resultImg = "";
  nameImage = "";


  /*=============================================
	Variable para precarga
	=============================================*/

  loadData = false;

  /*=============================================
	Visualizar del nombre de la categoría
	=============================================*/

	nameView = "";

  /*=============================================
	Visualizar el listado de títulos de la categoría
	=============================================*/

	titleView = "";

  /*=============================================
	Variables de estado y visualización
	=============================================*/

	state = "";
	view = "";


  constructor(private form: FormBuilder, private categoriesServices: CategoriesService, private imageService: ImagesService, public dialogRef: MatDialogRef<EditCategoriesComponent>,  @Inject(MAT_DIALOG_DATA) public data:  IDialogData) { }

  ngOnInit(): void {

    this.categoriesServices.getItem(this.data.id).subscribe(

      (resp:any)=> {

        this.icon.setValue(resp.icon);
        this.iconView = `<i class="${resp.icon}"></i>`;
        this.imgTemp = `${environment.urlFiles}categories/${resp.image}`;
        this.nameImage = resp.image;
        this.nameView = resp.name;
				this.urlInput = resp.url;
				this.titleView = JSON.parse(resp.title_list);
				this.state = resp.state;
				this.view = resp.view;

      }
    )

    
  }

  /*=============================================
	Función Edit Category
	=============================================*/

  editCategory(){

    this.loadData = true;

    /*=============================================
		Validamos que el formulario haya sido enviado
		=============================================*/

    this.formSubmitted = true;

    /*=============================================
		Validamos que el formulario esté correcto
		=============================================*/

    if(this.f.invalid) {

      return;
      
    }

    /*=============================================
		Subir imagen al servidor
		=============================================*/

    if(this.uploadFile){

      this.imageService.uploadImage(this.uploadFile, "categories", "", 170, 170, this.nameImage).subscribe((resp:any)=> {

        if (resp.status == 200){

          this.resultImg = resp.result;

        }else{

          alerts.basicAlert("Error", 'Invalid Picture', "error")

        }

      })

    }

    /*=============================================
		Verificar cambio de imagen
		=============================================*/

    if(this.resultImg == ""){

      this.resultImg = this.nameImage;
      
    }

    /*=============================================
		Verificar cambio de icono
		=============================================*/
    let icon = this.f.controls.icon.value;

    if(this.f.controls.icon.value.split('"')[1] != undefined){

      icon = this.f.controls.icon.value.split('"')[1];

    }

    /*=============================================
		Capturamos la información del formulario en la interfaz
		=============================================*/

    const dataCategory: Icategories = {

      icon:icon,
      image: this.nameImage,
      name: this.nameView,
      title_list:JSON.stringify(this.titleView),
      url:this.urlInput, 
			view:Number(this.view),
			state:this.state

    }

    /*=============================================
		Guardar en base de datos la info de la categoría
		=============================================*/

    this.categoriesServices.patchData(this.data.id, dataCategory).subscribe(

      resp =>{

        this.loadData = false;
        this.dialogRef.close('save');
        alerts.basicAlert("Ok", 'The category has been saved', "success")

      },

      err =>{

        this.loadData = false;

        alerts.basicAlert("Error", 'Category saving error', "error")

      }
    )
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

  /*=============================================
	Validamos imagen
	=============================================*/

  validateImage(e:any){

    functions.validateImage(e).then((resp:any) => {

      this.imgTemp = resp;
      this.uploadFile = e;

    })
    
  }

}