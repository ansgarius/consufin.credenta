import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  abrir_menu=false;

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
      el.scrollIntoView();
  }


  open_menu(){
    this.abrir_menu=!this.abrir_menu;


  }
}
