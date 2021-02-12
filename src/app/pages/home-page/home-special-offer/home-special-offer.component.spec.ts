import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSpecialOfferComponent } from './home-special-offer.component';

describe('HomeSpecialOfferComponent', () => {
  let component: HomeSpecialOfferComponent;
  let fixture: ComponentFixture<HomeSpecialOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSpecialOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
