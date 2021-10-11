import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPackageComponent } from './get-package.component';

describe('GetPackageComponent', () => {
  let component: GetPackageComponent;
  let fixture: ComponentFixture<GetPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
