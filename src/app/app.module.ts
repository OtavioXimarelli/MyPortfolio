import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ScrollAnimationService } from './services/scroll-animation.service';
import { CounterAnimationService } from './services/counter-animation.service';
// Import the standalone component
import { DevNoticeModalComponent } from './components/dev-notice-modal/dev-notice-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent
    // Do not declare DevNoticeModalComponent here since it's standalone
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Import the standalone component here
    DevNoticeModalComponent,
    RouterModule.forRoot([
      { path: '', component: AboutComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    ScrollAnimationService,
    CounterAnimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
