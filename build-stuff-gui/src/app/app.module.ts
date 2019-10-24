import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { StartpageComponent } from './components/startpage/startpage.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { SwaggerComponent } from './components/swagger/swagger.component';

const appRoutes: Routes = [
  { path: 'gui-drive', component: ContentComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'swagger', component: SwaggerComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: StartpageComponent }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ContentComponent, StartpageComponent, QuizComponent, SwaggerComponent],
  imports: [RouterModule.forRoot(appRoutes), BrowserModule, AppRoutingModule, ReactiveFormsModule, FontAwesomeModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
