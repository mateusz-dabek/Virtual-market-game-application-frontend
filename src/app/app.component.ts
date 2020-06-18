import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from './shared/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})  
export class AppComponent {
  title = 'Virtual Stock Exchange';
  constructor( private toastr: ToastrService) {
    ToastService.initialize(toastr);
  }
}
