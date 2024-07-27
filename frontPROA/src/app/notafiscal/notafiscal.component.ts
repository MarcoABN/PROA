import { Component, OnInit } from '@angular/core';
import { FrontNotafiscalService } from '../services/front-notafiscal.service';
import { Notafiscal } from '../model/notafiscal';
import { Embarcacao } from '../model/embarcacao';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontEmbarcacaoService } from '../services/front-embarcacao.service';

@Component({
  selector: 'app-notafiscal',
  templateUrl: './notafiscal.component.html',
  styleUrls: ['./notafiscal.component.css']
})
export class NotafiscalComponent implements OnInit {
  embarcacao: Embarcacao = new Embarcacao();
  idEmbarcacao!: number;
  notaFiscal: Notafiscal | null = null;
  novaNotaFiscal: Notafiscal = new Notafiscal();

  constructor(
    private notaFiscalService: FrontNotafiscalService, 
    private router: Router, 
    private route: ActivatedRoute,
    private embarcacaoService: FrontEmbarcacaoService
  ) {}

  ngOnInit(): void {
    this.idEmbarcacao = this.route.snapshot.params['id'];

    this.embarcacaoService.consultarEmbarcacao(this.idEmbarcacao).subscribe(data => {
      this.embarcacao = data;
    });
    this.listarNotaFiscal();
  }

  listarNotaFiscal(): void {
    this.notaFiscalService.listarNotaFiscalPorEmbarcacao(this.idEmbarcacao).subscribe(notasFiscais => {
        if (notasFiscais.length > 0) {
          this.notaFiscal = notasFiscais[0];
        } else {
          this.notaFiscal = null;
        }
      },
      (error) => {
        console.error('Erro ao listar notas fiscais:', error);
      }
    );
  }

  excluirNotaFiscal(): void {
    if (this.notaFiscal) {
      this.notaFiscalService.excluirNotaFiscal(this.notaFiscal.id).subscribe(
        () => {
          this.notaFiscal = null;
        },
        (error) => {
          console.error('Erro ao excluir nota fiscal:', error);
        }
      );
    }
  }

  salvarNotaFiscal(): void {
    this.novaNotaFiscal.embarcacao = this.embarcacao;
    if (this.notaFiscal) {
      this.notaFiscalService.alterarNotaFiscal(this.notaFiscal.id, this.notaFiscal).subscribe(
        () => {
          this.listarNotaFiscal();
        },
        (error) => {
          console.error('Erro ao alterar nota fiscal:', error);
        }
      );
    } else {
      this.notaFiscalService.incluirNotaFiscal(this.novaNotaFiscal).subscribe(
        () => {
          this.listarNotaFiscal();
        },
        (error) => {
          console.error('Erro ao incluir nota fiscal:', error);
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/embarcacao/listarembarcacao']);
  }
}
