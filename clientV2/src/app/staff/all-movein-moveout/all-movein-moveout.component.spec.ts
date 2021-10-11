import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMoveinMoveoutComponent } from './all-movein-moveout.component';

describe('AllMoveinMoveoutComponent', () => {
  let component: AllMoveinMoveoutComponent;
  let fixture: ComponentFixture<AllMoveinMoveoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMoveinMoveoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMoveinMoveoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
