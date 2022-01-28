import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { functions } from 'src/app/helpers/functions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CategoriesService } from 'src/app/services/categories.service';
import { Icategories } from 'src/app/interface/icategories';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoriesComponent } from './new-categories/new-categories.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger ('detailExpand',[
      state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class CategoriesComponent implements OnInit {

  /*=============================================
	Variable global que tipifica la interfaz de usuario
	=============================================*/

  categories:Icategories[] = [];

  /*=============================================
	Variable global que instancie la data que aparecerá en la Tabla
	=============================================*/

	dataSource!:MatTableDataSource<Icategories>;

  /*=============================================
	Variable para nombrar las columnas de nuestra tabla en Angular Material
	=============================================*/

  displayedColumns: string[] = [
    'position',
    'name',
    'actions'
  ];

  /*=============================================
	Variable global que informa a la vista cuando hay una expansión de la tabla
	=============================================*/

  expandedElement!: Icategories | null;

  /*=============================================
	Variable global que captura la ruta de los archivos de imagen
	=============================================*/

  path = environment.urlFiles;

  /*=============================================
	Variable global para definir tamaños de pantalla
	=============================================*/

  screenSizeSM = false;

  /*=============================================
	Paginación y orden
	=============================================*/

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  /*=============================================
	Variable global para saber cuando finaliza la carga de los datos
	=============================================*/

  loadData = false;

  constructor(private categoriesService: CategoriesService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getData();

    /*=============================================
		Definir tamaños de pantalla
		=============================================*/

    if(functions.screenSize(0, 767)){

      this.screenSizeSM = true;
    }else {

      this.screenSizeSM = false;

      this.displayedColumns.splice(1, 0, 'url');
      this.displayedColumns.splice(3, 0, 'image');
    }
  }

  /*=============================================
	función para tomar la data de usuarios
	=============================================*/

  getData(){

    this.loadData = true;

    this.categoriesService.getData().subscribe((resp:any)=>{

      /*=============================================
			Integrando respuesta de base de datos con la interfaz
			=============================================*/

      let position = Object.keys(resp).length;

      this.categories = Object.keys(resp).map(a=>({

        id:a,
        position:position--,
        name:resp[a].name,
        icon:resp[a].icon,
        image:resp[a].image,
        title_list:resp[a].title_list,
        url:resp[a].url,
        view:resp[a].view,
        state:resp[a].state

      } as Icategories));

      this.dataSource = new MatTableDataSource(this.categories);

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

      this.loadData = false;

    })
  }

  /*=============================================
	Filtro de Búsqueda
	=============================================*/

  applyFilter(event: Event){

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){

      this.dataSource.paginator.firstPage();

    }

  }

  /*=============================================
	función para llamar el diálogo de creación de categorías
	=============================================*/

  newCategory(){

    const dialogRef = this.dialog.open(NewCategoriesComponent,{width:'100%'})

    /*=============================================
		Actualizar el listado de la tabla
		=============================================*/

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.getData();

      }

    })
    
  }

  /*=============================================
	Cambiar estado de la categoría
	=============================================*/

  changeState(e:any){

    if(e.target.checked) {

      const data = {'state':'show'}

      this.categoriesService.patchData(e.target.id.split("_")[1], data)
      .subscribe(

        ()=>{

          this.getData();

        }
      )

    }else {

      const data = {'state':'hidden'}

      this.categoriesService.patchData(e.target.id.split("_")[1], data)
      .subscribe(

        ()=> {

          this.getData()

        }
      )
    }
  }

}
