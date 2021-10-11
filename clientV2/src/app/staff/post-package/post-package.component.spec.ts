import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPackageComponent } from './post-package.component';

describe('PostPackageComponent', () => {
  let component: PostPackageComponent;
  let fixture: ComponentFixture<PostPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
