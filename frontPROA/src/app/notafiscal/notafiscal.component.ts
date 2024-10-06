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
  selectedFile: File | null = null;

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
          this.loadNotaFiscalPDF();
        } else {
          this.notaFiscal = null;
        }
      },
      error => {
        console.error('Erro ao listar notas fiscais:', error);
      }
    );
  }

  loadNotaFiscalPDF(): void {
    if (this.notaFiscal) {
      this.notaFiscalService.getNotaFiscalPDF(this.notaFiscal.id).subscribe(pdf => {
        const url = URL.createObjectURL(pdf);
        const iframe = document.querySelector('iframe') as HTMLIFrameElement;
        iframe.src = url;
      }, error => {
        console.error('Erro ao carregar PDF:', error);
      });
    }
  }

  excluirNotaFiscal(): void {
    if (this.notaFiscal) {
      this.notaFiscalService.excluirNotaFiscal(this.notaFiscal.id).subscribe(
        () => {
          this.notaFiscal = null;
        },
        error => {
          console.error('Erro ao excluir nota fiscal:', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  salvarNotaFiscal(): void {
    if (this.selectedFile && this.notaFiscal) {
      this.notaFiscalService.uploadNotaFiscalPDF(this.notaFiscal.id, this.selectedFile).subscribe(
        () => {
          this.loadNotaFiscalPDF();
        },
        error => {
          console.error('Erro ao fazer upload do PDF:', error);
        }
      );
    } else {
      this.novaNotaFiscal.embarcacao = this.embarcacao;
      this.notaFiscalService.incluirNotaFiscal(this.novaNotaFiscal).subscribe(
        nota => {
          this.notaFiscal = nota as Notafiscal;
          if (this.selectedFile) {
            this.salvarNotaFiscal();  // Recur para upload do PDF após salvar a Nota Fiscal
          } else {
            this.listarNotaFiscal();
          }
        },
        error => {
          console.error('Erro ao incluir nota fiscal:', error);
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/embarcacao/listarembarcacao']);
  }
}