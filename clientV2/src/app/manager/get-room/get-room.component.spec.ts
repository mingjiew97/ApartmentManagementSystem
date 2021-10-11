import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRoomComponent } from './get-room.component';

describe('GetRoomComponent', () => {
  let component: GetRoomComponent;
  let fixture: ComponentFixture<GetRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
