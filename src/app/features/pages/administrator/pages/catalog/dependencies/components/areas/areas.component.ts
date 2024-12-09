import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss',
})
export class AreasComponent implements OnInit {
  area = new FormGroup({
    idOrganization: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    responsible: new FormControl(null, [Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {}
}
