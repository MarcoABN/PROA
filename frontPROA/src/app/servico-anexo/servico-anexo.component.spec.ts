import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoAnexoComponent } from './servico-anexo.component';

describe('ServicoAnexoComponent', () => {
  let component: ServicoAnexoComponent;
  let fixture: ComponentFixture<ServicoAnexoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoAnexoComponent]
    });
    fixture = TestBed.createComponent(ServicoAnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
