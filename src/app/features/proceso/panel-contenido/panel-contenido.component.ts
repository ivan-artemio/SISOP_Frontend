import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE } from 'src/app/core/constants/constants.core';
import { IAuth, TYPE_USER } from 'src/app/core/interfaces/auth.interface';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';
import { Menu, NavmenuService } from 'src/app/shared/services/navmenu.service';

@Component({
  selector: 'app-panel-contenido',
  templateUrl: './panel-contenido.component.html',
  styleUrl: './panel-contenido.component.scss',
})
export class PanelContenidoComponent implements OnInit {
  @Input() selectedheading_id: number;

  public tag: any = {};
  public BookmarkData: any = [
    {
      title: 'Precarta de presentación',
      title_id: 1,
      status: true,
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
      disabled: 'disabled',
    },
    {
      title: 'Carta de culminación',
      title_id: 9,
      status: false,
      data: [],
      icon: 'fas fa-lock',
      disabled: 'disabled',
    },
    {
      title: 'Descarga de documento',
      title_id: 10,
      status: false,
      data: [],
      icon: 'fas fa-lock',
      disabled: 'disabled',
    },
  ];
  public getBookmarkData: any = {};
  public isAdmin: boolean = false; 

  constructor(
    public navServices: NavmenuService,
    private readonly _localStorage: LocalStorageService
  ) {
    const user: IAuth = JSON.parse(this._localStorage.getItem(STORAGE.USER)) as IAuth;

    if (user && user.typeUser === 'admin') {  // Asegúrate de que 'role' o el campo adecuado esté presente en IAuth
      this.isAdmin = true;
    }
  }

  /*ngOnChanges(changes: SimpleChanges) {
    let emailid = changes['selectedId']?.currentValue;
    this.emailitem.map((data) => {
      if (data.id == emailid) {
        this.emailDatas = data;
      }
    })
  }*/

  // ngOnChanges(changes: SimpleChanges) {
  //   let id = changes['selectedheading_id']?.currentValue;
  //   this.BookmarkData.map((data) => {
  //     if (data.title_id === id) {
  //       this.getBookmarkData = data;
  //     }
  //   })
  //   let tagId = changes['selectegTagId']?.currentValue;

  //   this.tag.map((data) => {
  //     if (data.title_id === tagId) {
  //       this.getBookmarkData = data;
  //     }
  //   })
  // }

  ngOnInit(): void {
    console.log(this.selectedheading_id);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    let id = changes['selectedheading_id']?.currentValue;
    this.BookmarkData.map((data: any) => {
      if (data.title_id === id) {
        this.getBookmarkData = data;
      }
    });
    console.log(this.getBookmarkData);
    let tagId = changes['selectegTagId']?.currentValue;
  }
}
