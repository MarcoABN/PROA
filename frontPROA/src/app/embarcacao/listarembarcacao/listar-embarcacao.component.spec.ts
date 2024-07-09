import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ListarEmbarcacaoComponent } from './listar-embarcacao.component';

describe('ListarEmbarcacaoComponent', () => {
  let component: ListarEmbarcacaoComponent;
  let fixture: ComponentFixture<ListarEmbarcacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarEmbarcacaoComponent]
    });
    fixture = TestBed.createComponent(ListarEmbarcacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
