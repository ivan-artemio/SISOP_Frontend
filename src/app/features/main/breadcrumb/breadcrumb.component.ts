import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  PRIMARY_OUTLET,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  public breadcrumbs:
    | { parentBreadcrumb?: string | null; childBreadcrumb?: string }
    | undefined;
  public title: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        let snapshot = this.router.routerState.snapshot;
        let title = route.snapshot.data['title'];
        let parent = route.parent?.snapshot.data['breadcrumb'];
        let child = route.snapshot.data['breadcrumb'];
        this.breadcrumbs = {};
        this.title = title;
        this.breadcrumbs = {
          parentBreadcrumb: parent,
          childBreadcrumb: child,
        };
      });
  }
}
