import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserObjectComponent } from './user-object.component';

describe('UserObjectComponent', () => {
  let component: UserObjectComponent;
  let fixture: ComponentFixture<UserObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
