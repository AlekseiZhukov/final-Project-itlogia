import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "../../components/dialog/dialog.component";
import {NumberWindow, TypeDialog} from "../../../../types/dialog-data.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {numberWindow: NumberWindow.first, typeDialog: TypeDialog.consultation}
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

  ngOnInit(): void {

  }

}
