import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CreateComponent } from './admin/create/create.component';
import { ListComponent } from './board/list/list.component';
import { AccessComponent } from './access/access.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MemberinfoComponent } from './admin/memberinfo/memberinfo.component';
import { NewmemberComponent } from './admin/newmember/newmember.component';
import { AppComponent } from './app.component';
import { EditComponent } from './admin/edit/edit.component';

const routes: Routes = [
  { path: '', component: AccessComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent}
    ]
  },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'memberinfo/:id', component: MemberinfoComponent },
      { path: 'newmember', component: NewmemberComponent }
    ]
  },
  { path: 'board', component: BoardComponent,
    children: [
      { path: 'list', component: ListComponent }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
