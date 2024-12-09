import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pregunta-carta-preliminar',
  templateUrl: './pregunta-carta-preliminar.component.html'
})
export class PreguntaCartaPreliminarComponent {
  @Output() yesClicked = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal) {}

  onYesClick() {
    this.yesClicked.emit();
    this.activeModal.close();
  }
}