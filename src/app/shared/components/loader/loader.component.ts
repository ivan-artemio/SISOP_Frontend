import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  public show: boolean = false;

  constructor() {
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}
