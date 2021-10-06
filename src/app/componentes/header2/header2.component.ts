import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  @Output() open: EventEmitter<string>;

  constructor() {
    this.open = new EventEmitter();
  }

  ngOnInit(): void {
  }

  open_menu() {
    this.open.emit();

  }

}
