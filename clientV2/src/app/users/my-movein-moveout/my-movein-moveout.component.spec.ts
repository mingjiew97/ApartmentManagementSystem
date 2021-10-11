import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoveinMoveoutComponent } from './my-movein-moveout.component';

describe('MyMoveinMoveoutComponent', () => {
  let component: MyMoveinMoveoutComponent;
  let fixture: ComponentFixture<MyMoveinMoveoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMoveinMoveoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMoveinMoveoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
