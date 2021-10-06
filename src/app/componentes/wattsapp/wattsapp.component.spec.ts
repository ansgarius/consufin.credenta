import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WattsappComponent } from './wattsapp.component';

describe('WattsappComponent', () => {
  let component: WattsappComponent;
  let fixture: ComponentFixture<WattsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WattsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WattsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
