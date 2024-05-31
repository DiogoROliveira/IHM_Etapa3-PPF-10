import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointsCartPage } from './points-cart.page';

describe('PointsCartPage', () => {
  let component: PointsCartPage;
  let fixture: ComponentFixture<PointsCartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
