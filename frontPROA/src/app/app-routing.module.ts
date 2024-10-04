import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListarEmbarcacaoComponent } from './embarcacao/listarembarcacao/listar-embarcacao.component';
import { ConsultarEmbarcacaoComponent } from './embarcacao/consultarembarcacao/consultar-embarcacao.component';
import { CadastrarEmbarcacaoComponent } from './embarcacao/cadastrarembarcacao/cadastrar-embarcacao.component';
import { AlterarEmbarcacaoComponent } from './embarcacao/alterarembarcacao/alterar-embarcacao.component';
import { ConsultarClienteComponent } from './cliente/consultarcliente/consultar-cliente.component';
import { CadastrarClienteComponent } from './cliente/cadastrarcliente/cadastrar-cliente.component';
import { ListarClienteComponent } from './cliente/listarcliente/listar-cliente.component';
import { AlterarClienteComponent } from './cliente/alterarcliente/alterar-cliente.component';
import { AnexosComponent } from './anexos/anexos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/autenticacao/auth.guard'; // Importe o AuthGuard
import { ManterMotorComponent } from './motor/manter-motor.component';
import { NotafiscalComponent } from './notafiscal/notafiscal.component';
import { ServicoAnexoComponent } from './servico-anexo/servico-anexo.component';
import { EmpresaComponent } from './empresa/empresa.component';

const routes: Routes = [
  { path: '', redirectTo: 'login/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'embarcacao/listarembarcacao', component: ListarEmbarcacaoComponent, canActivate: [AuthGuard] },
  { path: 'embarcacao/consultar-embarcacao/:id', component: ConsultarEmbarcacaoComponent, canActivate: [AuthGuard] },
  { path: 'embarcacao/cadastrar-embarcacao', component: CadastrarEmbarcacaoComponent, canActivate: [AuthGuard] },
  { path: 'embarcacao/alterar-embarcacao/:id', component: AlterarEmbarcacaoComponent, canActivate: [AuthGuard] },
  { path: 'cliente/listar-cliente', component: ListarClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente/cadastrar-cliente', component: CadastrarClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente/consultar-cliente/:id', component: ConsultarClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente/alterar-cliente/:id', component: AlterarClienteComponent, canActivate: [AuthGuard] },
  { path: 'anexos/anexos', component: AnexosComponent, canActivate: [AuthGuard] },
  { path: 'login/login', component: LoginComponent },
  { path: 'motor/manter-motor/:id', component: ManterMotorComponent, canActivate: [AuthGuard] },
  { path: 'notafiscal/notafiscal/:id', component: NotafiscalComponent, canActivate: [AuthGuard] },
  { path: 'servico-anexo/servico-anexo', component: ServicoAnexoComponent, canActivate: [AuthGuard] },
  { path: 'empresa/empresa', component: EmpresaComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
