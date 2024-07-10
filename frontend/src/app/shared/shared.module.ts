import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {PhonePipe} from './pipes/phone.pipe';
import {PhoneMaskDirective} from './directives/phone-mask.directive';
import {ArticleCardComponent} from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import {ArticlesFilterComponent} from './components/articles-filter/articles-filter.component';
import {LoaderComponent} from './components/loader/loader.component';
import { ConvertDatePipe } from './pipes/convert-date.pipe';


@NgModule({
  declarations: [
    DialogComponent,
    PhonePipe,
    PhoneMaskDirective,
    ArticleCardComponent,
    ArticlesFilterComponent,
    LoaderComponent,
    ConvertDatePipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    DialogComponent,
    PhonePipe,
    ConvertDatePipe,
    PhoneMaskDirective,
    ArticleCardComponent,
    ArticlesFilterComponent,
    LoaderComponent
  ]
})
export class SharedModule {
}
