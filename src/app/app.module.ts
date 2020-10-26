import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UniversitiesComponent } from './universities/universities.component';
import { UniversityComponent } from './universities/university/university.component';
import { UniversityService } from "./shared/university.service"
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { UniversityListComponent } from './universities/university-list/university-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UniversitiesComponent,
    UniversityComponent,
    UniversityListComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [UniversityService],
  bootstrap: [AppComponent],
  entryComponents: [UniversityComponent, MatConfirmDialogComponent]
})
export class AppModule { }
