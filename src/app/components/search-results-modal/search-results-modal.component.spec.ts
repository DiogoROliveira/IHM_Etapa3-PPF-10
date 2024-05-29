import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchResultsModalComponent } from './search-results-modal.component';

describe('SearchResultsModalComponent', () => {
  let component: SearchResultsModalComponent;
  let fixture: ComponentFixture<SearchResultsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
