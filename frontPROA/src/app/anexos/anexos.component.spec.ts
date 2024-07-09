import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexosComponent } from './anexos.component';

describe('AnexosComponent', () => {
  let component: AnexosComponent;
  let fixture: ComponentFixture<AnexosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnexosComponent]
    });
    fixture = TestBed.createComponent(AnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});