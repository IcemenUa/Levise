import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOfferCardsComponent } from './home-offer-cards.component';

describe('HomeOfferCardsComponent', () => {
  let component: HomeOfferCardsComponent;
  let fixture: ComponentFixture<HomeOfferCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOfferCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOfferCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
