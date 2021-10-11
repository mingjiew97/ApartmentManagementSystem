import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelLeaseComponent } from './cancel-lease.component';

describe('CancelLeaseComponent', () => {
  let component: CancelLeaseComponent;
  let fixture: ComponentFixture<CancelLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
