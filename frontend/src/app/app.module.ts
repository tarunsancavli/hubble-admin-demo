import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import { AppComponent } from './app.component';
import { AppBasicComponent } from './app-basic/app-basic.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ListUserComponent } from './list-user/list-user.component';
import {MatDividerModule} from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ToastrModule} from 'ngx-toastr';
import { JwPaginationModule } from 'jw-angular-pagination';
import {TagInputModule} from 'ngx-chips';

@NgModule({
  declarations: [
    AppComponent,
    AppBasicComponent,
    CreateUserComponent,
    ListUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CdkAccordionModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    JwPaginationModule,
    TagInputModule,
    FormsModule

  ],
  providers: [],
  schemas:[NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
