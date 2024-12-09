import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationDTO } from 'src/app/core/interfaces/organization.interface';

@Component({
  selector: 'app-new-dependency',
  templateUrl: './new-dependency.component.html',
  styleUrl: './new-dependency.component.scss',
})
export class NewDependencyComponent implements OnInit {
  @Input() readOnly: boolean = false;
  @Input() data: OrganizationDTO | undefined = undefined;

  dependencyForm = new FormGroup({
    rfc: new FormControl<string | null>(null, [Validators.required]),
    name: new FormControl<string | null>(null, [Validators.required]),
    responsible: new FormControl<string | null>(null, [Validators.required]),
    phone: new FormControl<string | null>(null, [Validators.required]),
    address: new FormControl(<string | null>null, [Validators.required]),
    acronym: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(private readonly _activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.readOnly) {
      this.dependencyForm.disable();
    }

    if (this.data !== undefined) {
      this.dependencyForm.patchValue(this.data);
    }
  }

  closeModal(): void {
    this._activeModal.close(null);
  }

  onSubmit(): void {
    if (this.dependencyForm.invalid) {
      this.dependencyForm.markAsTouched();
      return;
    }
    this._activeModal.close(this.dependencyForm.value);
  }
}
