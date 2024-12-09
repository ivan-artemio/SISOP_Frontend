import { BehaviorSubject } from 'rxjs';
import { IAuth, TYPE_USER } from 'src/app/core/interfaces/auth.interface';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { STORAGE } from 'src/app/core/constants/constants.core';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';
import { Menu, NavmenuService } from 'src/app/shared/services/navmenu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public menuItems = this.navServices.MENUITEMS;
  public margin: number = 0;
  public width: number = window.innerWidth;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;
  public screenWidth: number;
  public screenHeight: number;
  public pined: boolean = false;
  public pinedItem: number[] = [];

  constructor(
    private router: Router,
    public navServices: NavmenuService,
    private readonly _localStorage: LocalStorageService
  ) {
    const user: IAuth = JSON.parse(
      this._localStorage.getItem(STORAGE.USER)
    ) as IAuth;

    const menuItems: BehaviorSubject<Menu[]> =
      user.typeUser === TYPE_USER.STUDENT
        ? this.navServices.menuStudent
        : this.navServices.item;

    menuItems.subscribe((menuItems: Menu[]) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems: Menu) => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });
              return;
            });
            return;
          });
        }
      });
    });
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  setNavActive(item: Menu) {
    this.menuItems.filter((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          } else {
            submenuItems.active = false;
          }
        });
      }
    });
  }

  openMenu() {
    this.navServices.isDisplay = !this.navServices.isDisplay;
  }

  // For Horizontal Menu

  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3700) {
      this.margin = -3200;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }

  toggleMenu(item: Menu) {
    if (!item.active) {
      this.menuItems.forEach((a: Menu) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: Menu) => {
          if (a.children?.includes(item)) {
            b.active = false;
          }
        });
        return;
      });
    }
    item.active = !item.active;
  }

  isPined(itemid: number) {
    return this.pinedItem.includes(itemid);
  }

  togglePined(id: number): void {
    const index = this.pinedItem.indexOf(id);
    if (index !== -1) {
      this.pinedItem.splice(index, 1);
    } else {
      this.pinedItem.push(id);
    }
    if (this.pinedItem.length <= 0) {
      this.pined = false;
    } else {
      this.pined = true;
    }
  }
}
