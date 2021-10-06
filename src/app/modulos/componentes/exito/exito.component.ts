import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.css']
})
export class ExitoComponent implements OnInit {
  @Input() mensajeExito: string;
  constructor() { }

  ngOnInit(): void {
  }

}
