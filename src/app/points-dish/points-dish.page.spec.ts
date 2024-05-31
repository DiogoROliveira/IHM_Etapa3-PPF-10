import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointsDishPage } from './points-dish.page';

describe('PointsDishPage', () => {
  let component: PointsDishPage;
  let fixture: ComponentFixture<PointsDishPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsDishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
