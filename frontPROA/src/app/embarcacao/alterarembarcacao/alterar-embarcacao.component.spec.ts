import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarEmbarcacaoComponent } from './alterar-embarcacao.component';

describe('AlterarEmbarcacaoComponent', () => {
  let component: AlterarEmbarcacaoComponent;
  let fixture: ComponentFixture<AlterarEmbarcacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarEmbarcacaoComponent]
    });
    fixture = TestBed.createComponent(AlterarEmbarcacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
