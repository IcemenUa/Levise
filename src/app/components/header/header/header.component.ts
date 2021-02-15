import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isExpanded: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }
}


