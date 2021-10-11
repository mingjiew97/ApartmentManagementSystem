import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentInformationComponent } from './apartment-information.component';

describe('ApartmentInformationComponent', () => {
  let component: ApartmentInformationComponent;
  let fixture: ComponentFixture<ApartmentInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
