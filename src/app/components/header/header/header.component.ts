import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  leftMenuCategoryOpen: boolean;
  rightMenuCategoryOpen: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  leftMenuCategoryToggle(): void {
    this.leftMenuCategoryOpen = !this.leftMenuCategoryOpen
  }
  rightMenuCategoryToggle(): void {
    this.rightMenuCategoryOpen = !this.rightMenuCategoryOpen
  }

}


