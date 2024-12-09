import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HideNavScrollService } from 'src/app/shared/services/hide-nav-scroll.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { NavmenuService } from 'src/app/shared/services/navmenu.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  public innerWidth: number;

  constructor(
    private router: Router,
    public hidenav: HideNavScrollService,
    public navmenu: NavmenuService,
    public layout: LayoutService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: number) {
    this.navmenu.isDisplay = window.innerWidth < 1200 ? true : false;
    if (window.innerWidth < 1200) {
      this.layout.config.settings.sidebar_type = 'compact-wrapper';
    }
  }

  ngOnInit(): void {
    const url = this.router.url;
    this.innerWidth = window.innerWidth;
  }
}
