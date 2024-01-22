import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchObjectComponent } from './search-object.component';

describe('SearchObjectComponent', () => {
  let component: SearchObjectComponent;
  let fixture: ComponentFixture<SearchObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
