import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VencimentoComponent } from './vencimento.component';

describe('VencimentoComponent', () => {
  let component: VencimentoComponent;
  let fixture: ComponentFixture<VencimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VencimentoComponent]
    });
    fixture = TestBed.createComponent(VencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
