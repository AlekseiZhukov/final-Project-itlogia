import { Pipe, PipeTransform } from '@angular/core';
import {AsYouType} from "libphonenumber-js";
@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phoneValue:  number | string): string | null{
    let ayt = new AsYouType("RU");

    try {
      ayt.input(phoneValue + "");
      if (ayt.getNumber() !== undefined) {
        return String(ayt.getNumber()!.formatNational());
      } else {
        return null
      }
    } catch (error) {
      console.log(error);
      return String(phoneValue);
    }
  }

}
