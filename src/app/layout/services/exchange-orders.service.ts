import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OpenPosition, PendingPosition } from '../model/position';
import { Subject, Observable } from 'rxjs';
import { UsernameService } from 'src/app/account/services/username.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeOrdersService {
  openPositions: Subject<OpenPosition[]> = new Subject<OpenPosition[]>(); // source
  openPositionsObs: Observable<OpenPosition[]>  = this.openPositions.asObservable(); // stream
  pendingPosition: Subject<PendingPosition[]> = new Subject<PendingPosition[]>();
  pendingPositionsObs: Observable<PendingPosition[]> = this.pendingPosition.asObservable();

  constructor(private http: HttpClient, private username: UsernameService) {

  }

  requestOpenPositions(): void {
    this.http.get<OpenPosition[]>(environment.endpoints.apiPath + environment.endpoints.openPositionPath)
      .subscribe(openPositions => this.openPositions.next(openPositions));
  }

  requestPendingPositions(): void {
    this.http.get<PendingPosition[]>(environment.endpoints.apiPath + environment.endpoints.pendingPositionPath)
      .subscribe(pendingPositions => this.pendingPosition.next(pendingPositions));
  }

  closeOpenPosition(id: number) {
    this.http.delete(environment.endpoints.apiPath + environment.endpoints.openPositionPath + '/' + id).subscribe(
      () => {
        this.requestOpenPositions();
        this.username.refreshBalaceUser();
        ToastService.success('Success', 'Order has been closed');
      }
    );
  }

  closePendingPosition(id: number) {
    this.http.delete(environment.endpoints.apiPath + environment.endpoints.pendingPositionPath + '/' + id).subscribe(
      () => {
        this.requestPendingPositions();
        this.username.refreshBalaceUser();
        ToastService.success('Success', 'Order has been closed');
      }
    );
  }

}
