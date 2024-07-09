import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEmbarcacaoComponent } from './consultar-embarcacao.component';

describe('ConsultarEmbarcacaoComponent', () => {
  let component: ConsultarEmbarcacaoComponent;
  let fixture: ComponentFixture<ConsultarEmbarcacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarEmbarcacaoComponent]
    });
    fixture = TestBed.createComponent(ConsultarEmbarcacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
