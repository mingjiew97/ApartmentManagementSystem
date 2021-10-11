import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCollectionComponent } from './rent-collection.component';

describe('RentCollectionComponent', () => {
  let component: RentCollectionComponent;
  let fixture: ComponentFixture<RentCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
