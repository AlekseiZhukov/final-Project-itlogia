import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {NumberWindow, TypeDialog} from "../../../../types/dialog-data.type";
import {Router} from "@angular/router";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() card!: ArticleType;
  @Input() typeCard!: 'article' | 'service';
  serverStaticPath = environment.serverStaticPath;
  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog(category?: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {numberWindow: NumberWindow.first, typeDialog: TypeDialog.service, category}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.dialog.open(DialogComponent, {
          data: {numberWindow: NumberWindow.second}
        });
      }
    });
  }

  goToArticle(url: string | undefined): void {
    if (url) {
      this.router.navigate(['/article/' + url])
    }

  }

}
