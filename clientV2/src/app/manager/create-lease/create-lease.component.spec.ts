import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaseComponent } from './create-lease.component';

describe('CreateLeaseComponent', () => {
  let component: CreateLeaseComponent;
  let fixture: ComponentFixture<CreateLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
