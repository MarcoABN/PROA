import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEmbarcacaoComponent } from './cadastrar-embarcacao.component';

describe('CadastrarEmbarcacaoComponent', () => {
  let component: CadastrarEmbarcacaoComponent;
  let fixture: ComponentFixture<CadastrarEmbarcacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarEmbarcacaoComponent]
    });
    fixture = TestBed.createComponent(CadastrarEmbarcacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
