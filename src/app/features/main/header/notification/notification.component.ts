import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public active = 1;
  public notifications: boolean = false;
  public openTab: string = "all";

  constructor() { }

  public tabbed(val: string) {
    this.openTab = val
  }

  notification() {
    this.notifications = !this.notifications
  }

}
