import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpService } from './http.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './board/list/list.component';
import { AccessComponent } from './access/access.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { CreateComponent } from './admin/create/create.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MemberinfoComponent } from './admin/memberinfo/memberinfo.component';
import { NewmemberComponent } from './admin/newmember/newmember.component';
import { EditComponent } from './admin/edit/edit.component';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    CreateComponent,
    ListComponent,
    RegisterComponent,
    AccessComponent,
    AdminComponent,
    DashboardComponent,
    MemberinfoComponent,
    NewmemberComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService, WebsocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
