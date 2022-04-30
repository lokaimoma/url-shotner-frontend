import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlboardComponent } from './urlboard.component';

describe('UrlboardComponent', () => {
  let component: UrlboardComponent;
  let fixture: ComponentFixture<UrlboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
