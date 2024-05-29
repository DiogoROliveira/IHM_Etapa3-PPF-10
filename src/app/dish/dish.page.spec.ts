import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishPage } from './dish.page';

describe('DishPage', () => {
  let component: DishPage;
  let fixture: ComponentFixture<DishPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
