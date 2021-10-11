import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveInMoveOutComponent } from './move-in-move-out.component';

describe('MoveInMoveOutComponent', () => {
  let component: MoveInMoveOutComponent;
  let fixture: ComponentFixture<MoveInMoveOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveInMoveOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveInMoveOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
