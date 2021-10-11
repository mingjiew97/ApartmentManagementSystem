import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMaintenanceComponent } from './my-maintenance.component';

describe('MyMaintenanceComponent', () => {
  let component: MyMaintenanceComponent;
  let fixture: ComponentFixture<MyMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
