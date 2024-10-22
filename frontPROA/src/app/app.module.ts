import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListarEmbarcacaoComponent } from './embarcacao/listarembarcacao/listar-embarcacao.component';
import { ConsultarEmbarcacaoComponent } from './embarcacao/consultarembarcacao/consultar-embarcacao.component';
import { CadastrarEmbarcacaoComponent } from './embarcacao/cadastrarembarcacao/cadastrar-embarcacao.component';
import { AlterarEmbarcacaoComponent } from './embarcacao/alterarembarcacao/alterar-embarcacao.component';
import { ConsultarClienteComponent } from './cliente/consultarcliente/consultar-cliente.component';
import { ListarClienteComponent } from './cliente/listarcliente/listar-cliente.component';
import { CadastrarClienteComponent } from './cliente/cadastrarcliente/cadastrar-cliente.component';
import { AlterarClienteComponent } from './cliente/alterarcliente/alterar-cliente.component';
import { AnexosComponent } from './anexos/anexos.component';
import { AngularFireModule } from '@angular/fire/compat'
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ManterMotorComponent } from './motor/manter-motor.component';
import { NotafiscalComponent } from './notafiscal/notafiscal.component';
import { ServicoAnexoComponent } from './servico-anexo/servico-anexo.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { SafeUrlPipe } from './safe-url.pipe';




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListarEmbarcacaoComponent,
    ConsultarEmbarcacaoComponent,
    CadastrarEmbarcacaoComponent,
    AlterarEmbarcacaoComponent,

    ConsultarClienteComponent,
    ListarClienteComponent,
    CadastrarClienteComponent,
    AlterarClienteComponent,

    AnexosComponent,
    LoginComponent,

    ManterMotorComponent,
     NotafiscalComponent,
     ServicoAnexoComponent,
     EmpresaComponent,
     SafeUrlPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,
    MatIconModule,
    MaterialModule,

    NgxMaskDirective, 
    NgxMaskPipe,

    AngularFireModule.initializeApp(
      {
      apiKey: "AIzaSyDpXPsgWBRS8vyPL2r6xjMVRu7uwe9pQXI",
      authDomain: "proa2024.firebaseapp.com",
      projectId: "proa2024",
      storageBucket: "proa2024.appspot.com",
      messagingSenderId: "814719286160",
      appId: "1:814719286160:web:e71dc61f1b09a8bf311115",
      measurementId: "G-MWRRS9GZ8G"
      }),
    BrowserAnimationsModule
  ],
  providers: [DatePipe, provideNgxMask()
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
