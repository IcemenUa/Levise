import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  mainCard = 'men';
  constructor() { }

  ngOnInit(): void {
  }

  cardPosition(cardName): void {
    this.mainCard = cardName
  }

}
