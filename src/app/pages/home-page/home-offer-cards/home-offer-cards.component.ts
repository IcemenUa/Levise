import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-offer-cards',
  templateUrl: './home-offer-cards.component.html',
  styleUrls: ['./home-offer-cards.component.scss']
})
export class HomeOfferCardsComponent implements OnInit {
  cardsArr: Array<object> = [];
  offerName: string = "BLACK HISTORY MONTH AT LEVI'S"
  constructor() { }

  ngOnInit(): void {
  }

}
