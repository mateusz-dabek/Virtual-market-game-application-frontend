import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  static toastr: ToastrService;

  static initialize(toastr: ToastrService) {
    if (!ToastService.toastr) {
      ToastService.toastr = toastr;
    }
  }

  static success(title: string, message: string) {
    this.toastr.success(message, title, options);
  }

  static error(title: string, message: string) {
    this.toastr.error(message, title, options);
  }

  static info(title: string, message: string) {
    this.toastr.info(message, title, options);
  }

  static warning(title: string, message: string) {
    this.toastr.warning(message, title, options);
  }
}

const options = {
  positionClass: 'toast-bottom-right',
  easeTime: '500'
};
