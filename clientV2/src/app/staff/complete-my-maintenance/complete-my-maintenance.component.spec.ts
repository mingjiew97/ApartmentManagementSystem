import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMyMaintenanceComponent } from './complete-my-maintenance.component';

describe('CompleteMyMaintenanceComponent', () => {
  let component: CompleteMyMaintenanceComponent;
  let fixture: ComponentFixture<CompleteMyMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteMyMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteMyMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
