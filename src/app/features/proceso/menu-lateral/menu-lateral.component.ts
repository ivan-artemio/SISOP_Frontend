import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-lateral',
  //standalone: true,
  //imports: [],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
})
export class MenuLateralComponent {
  public selectedheading_id: number;
  public selectegTagId: number;
  public selectedId: number;
  public open: boolean = false;
  public BookmarkData: any = [
    {
      title: 'Precarta de presentación',
      title_id: 1,
      status: false,
      data: [],
      icon: 'fas fa-check-circle font-success',
      disabled: '',
    },
    {
      title: 'Carta de presentación',
      title_id: 2,
      status: false,
      data: [],
      icon: 'fas fa-check-circle font-success',
      disabled: '',
    },
    {
      title: 'Carta de aceptación',
      title_id: 3,
      status: false,
      data: [],
      icon: 'fas fa-check-circle font-success',
      disabled: '',
    },
    {
      title: 'Reporte 1',
      title_id: 4,
      status: false,
      data: [],
      icon: 'fas fa-check-circle font-success',
      disabled: '',
    },
    {
      title: 'Reporte 2',
      title_id: 5,
      status: false,
      data: [],
      icon: 'fas fa-check-circle font-success',
      disabled: '',
    },
    {
      title: 'Reporte 3',
      title_id: 6,
      status: false,
      data: [],
      icon: 'fas fa-check-circle font-success',
      disabled: '',
    },
    {
      title: 'Reporte 4',
      title_id: 7,
      status: false,
      data: [],
      icon: 'far fa-folder-open',
      disabled: '',
    },
    {
      title: 'Reporte final',
      title_id: 8,
      status: false,
      data: [],
      icon: 'fas fa-lock',
      disabled: '',
    },
    {
      title: 'Carta de culminación',
      title_id: 9,
      status: false,
      data: [],
      icon: 'fas fa-lock',
      disabled: '',
    },
    {
      title: 'Oficio de termino de prácticas',
      title_id: 10,
      status: false,
      data: [],
      icon: 'fas fa-lock',
      disabled: '', //disabled
    },
  ];
  public tag: any = {};
  //public BookmarkData = allBookmarkData;
  //public tag = tagData;

  constructor(private modalService: NgbModal) {}

  openAddBookmark() {
    //const modalRef = this.modalService.open(NewBookmarkComponent, { size: 'lg' });
  }

  openAddTag() {
    //const modalRef = this.modalService.open(AddTagComponent, { size: 'lg' });
  }

  openMenu() {
    this.open = !this.open;
  }

  //getData(title_id: number) {
  // const getHeadingData = this.BookmarkData.filter((data) => {
  //   return data.title_id === title_id
  // })
  // this.selectedheading_id = getHeadingData[0].title_id!
  //}

  /*getData_ant(title_id: number) {
    const getHeadingData = this.BookmarkData.filter((data: any) => {
        return data.title_id === title_id;
    });
    if (getHeadingData.length > 0) {
        this.selectedheading_id = getHeadingData[0].title_id!;
    } else {
        // Manejar el caso en el que no se encontraron datos
    }
    //console.log(this.selectedheading_id);
  }*/

  getData(title_id: number) {
    this.selectedheading_id = title_id;
    //console.log(this.selectedheading_id);
    // const getdata = this.BookmarkData.filter((data: any) => data.title_id == title_id);
    // //this.selectedId = getdata[0].id;
    // this.selectedheading_id = getdata[0].title_id;
    this.BookmarkData.filter((data: any) => {
      if (title_id == data.title_id) {
        data.status = true;
      } else {
        data.status = false;
      }
    });
    //console.log(this.BookmarkData);
  }

  clickOutside(): void {
    this.open = false;
  }
}
