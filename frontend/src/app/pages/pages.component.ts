import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

//declare function customInitFunctions(): void;// FUNCIONA POR EL MOMENTO
declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit{

  constructor(private sidebarservice: SidebarService){}

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarservice.cargarMenu();
    console.log('CARGA DEL MENU LLEGA',this.sidebarservice.menu);
  }

}
