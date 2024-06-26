import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDataType, NumberWindow, TypeDialog} from "../../../../types/dialog-data.type";
import {RequestService} from "../../services/request.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',

})
export class DialogComponent {
  numberWindow = NumberWindow;
  typeDialog = TypeDialog;
  requestForm = {
    name: '',
    phone: '',
    category: ''
  }

  categories = [
    {
      id: "667171be69a28e447b6d74ec",
      name: "Фриланс",
      url: "frilans"
    },
    {
      id: "667171be69a28e447b6d74ed",
      name: "Дизайн",
      url: "dizain"
    },
    {
      id: "667171be69a28e447b6d74ee",
      name: "SMM",
      url: "smm"
    },
    {
      id: "667171be69a28e447b6d74ef",
      name: "Таргет",
      url: "target"
    },
    {
      id: "667171be69a28e447b6d74f0",
      name: "Копирайтинг",
      url: "kopiraiting"
    }
  ]
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataType,
    private requestService: RequestService

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClickConsultation(reForm: NgForm) {
    if (reForm.valid) {
      console.log(this.requestForm)
    }

    //this.requestService.rquest()
    this.dialogRef.close('second');
  }
  onClickService(reForm: NgForm) {
    if (reForm.valid) {
      console.log(this.requestForm)
    }
    this.dialogRef.close('second');
  }

}
