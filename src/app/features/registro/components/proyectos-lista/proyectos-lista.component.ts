import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Allbookmark, allBookmarkData, bookmarkDataInterface, tagData } from '../../../../shared/data/bookmark/bookmarks';
import { HttpClient } from '@angular/common/http'
import { ProyectosService } from '../../services/proyectos.service';
import { Observable, catchError, map, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntaCartaPreliminarComponent } from '../pregunta-carta-preliminar/pregunta-carta-preliminar.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-proyectos-lista',
  //standalone: true,
  //imports: [],
  templateUrl: './proyectos-lista.component.html',
  styleUrl: './proyectos-lista.component.scss'
})
export class ProyectosListaComponent {
  @Input() selectedheading_id: number;
  @Input() selectegTagId: number;

  public BookmarkData = allBookmarkData;
  public tag = tagData;
  public getBookmarkData: Allbookmark;
  public listBookmark: boolean = false;
  public editBookmarkData: bookmarkDataInterface[];
  public bookmarkData: bookmarkDataInterface[] = []
  searchText = '';
  proyectos: any[];
  //public favouriteData: bookmarkDataInterface[];

  constructor(private http: HttpClient, private proyectosService: ProyectosService, private modalService: NgbModal,   private router: Router  // Asegúrate de que esta línea esté presente
  ) { }

  loading: boolean = true;
  //carreras:any[] = [];

  //@ViewChild("editBookmarkModal") EditBookmarkModal: EditBookmarkComponent;

  ngOnInit(): void {

    this.obtenerProyectos();


    this.BookmarkData.map((data) => {
      if (data.status) {
        this.getBookmarkData = data;
        //console.log(this.getBookmarkData);
        for (let i of data.data) {
          this.bookmarkData.push(i)
        }
      }
    })
  }

  changegrid() {
    this.listBookmark = false
  }
  changelist() {
    this.listBookmark = true
  }

  ngOnChanges(changes: SimpleChanges) {
    let id = changes['selectedheading_id']?.currentValue;
    this.BookmarkData.map((data) => {
      if (data.title_id === id) {
        this.getBookmarkData = data;
      }
    })
    let tagId = changes['selectegTagId']?.currentValue;

    this.tag.map((data) => {
      if (data.title_id === tagId) {
        this.getBookmarkData = data;
      }
    })
  }

  modal(id: number) {
    /*const a = this.bookmarkData.filter((data) => {
      return data.id === id;
    })
    this.editBookmarkData = a;
    this.EditBookmarkModal.openModal(this.editBookmarkData)*/
  }

  /*favourite(id: number) {
    this.favouriteData = this.BookmarkData[0].data.filter((data) => {
      return data.id === id;
    })
    this.favouriteData[0].favourite = !this.favouriteData[0].favourite;
  }*/

  get filteredData() {
    if (!this.searchText) {
      //console.log(this.proyectos);
      return this.proyectos;
    }
    const searchTextLower = this.searchText.toLowerCase();
    return this.proyectos.filter(item =>
      item.name.toLowerCase().includes(searchTextLower) ||
      item.name.toLowerCase().includes(searchTextLower)
    );
  }



  //===============
  obtenerProyectos() {
    this.proyectosService.getProjects().subscribe({
      next: (proyectos) => {
          
          this.proyectos = proyectos.data;
          this.loading = false;
          //console.log("--", this.proyectos);
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete') 
    })
  }

  composeEmail() {
    const modalRef = this.modalService.open(PreguntaCartaPreliminarComponent, { size: 'md' });

    modalRef.componentInstance.yesClicked.subscribe(() => {
      console.log('Yes clicked');

      this.router.navigate(['/proceso']);
    });
  }
  

 
  
}
