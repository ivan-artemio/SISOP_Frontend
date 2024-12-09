import { Component, HostListener } from '@angular/core';
import { STORAGE } from 'src/app/core/constants/constants.core';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';
import { HideNavScrollService } from 'src/app/shared/services/hide-nav-scroll.service';
import { Menu, NavmenuService } from 'src/app/shared/services/navmenu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public menuItems: Menu[] = [];
  public item: Menu[] = [];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public open = false;

  public user: IUser = {} as IUser;

  constructor(
    public hidenav: HideNavScrollService,
    public navmenu: NavmenuService,
    private readonly _localStorage: LocalStorageService
  ) {
    this.navmenu.item.subscribe((menuItems: Menu[]) => (this.item = menuItems));
    this.user = JSON.parse(this._localStorage.getItem(STORAGE.USER)) as IUser;
  }

  openMenu() {
    this.navmenu.isDisplay = !this.navmenu.isDisplay;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: number) {
    this.navmenu.isDisplay = window.innerWidth < 1200 ? true : false;
  }

  openSearch() {
    this.open = !this.open;
    this.searchResult = false;
  }

  languageToggle() {
    this.navmenu.language = !this.navmenu.language;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.item.forEach((data) => {
      if (data.title?.toLowerCase().includes(term) && data.type === 'link') {
        items.push(data);
      }
      data.children?.filter((subItems) => {
        if (
          subItems.title?.toLowerCase().includes(term) &&
          subItems.type === 'link'
        ) {
          subItems.icon = data.icon;
          items.push(subItems);
        }
        subItems.children?.filter((suSubItems) => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = data.icon;
            items.push(suSubItems);
          }
        });
        return;
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
    });
    return;
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    this.text = '';
    document.body.classList.remove('offcanvas');
  }

  clickOutside(): void {
    this.open = false;
    this.searchResult = false;
    this.searchResultEmpty = false;
  }
}
