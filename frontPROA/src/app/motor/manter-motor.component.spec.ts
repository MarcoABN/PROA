import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterMotorComponent } from './manter-motor.component';

describe('ManterMotorComponent', () => {
  let component: ManterMotorComponent;
  let fixture: ComponentFixture<ManterMotorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManterMotorComponent]
    });
    fixture = TestBed.createComponent(ManterMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
