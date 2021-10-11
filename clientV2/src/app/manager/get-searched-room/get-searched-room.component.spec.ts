import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSearchedRoomComponent } from './get-searched-room.component';

describe('GetSearchedRoomComponent', () => {
  let component: GetSearchedRoomComponent;
  let fixture: ComponentFixture<GetSearchedRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSearchedRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSearchedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
