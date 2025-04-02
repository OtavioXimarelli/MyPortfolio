import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpenSource = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSource.asObservable();
  
  constructor() {}
  
  open() {
    this.isOpenSource.next(true);
    document.body.classList.add('modal-open');
  }
  
  close() {
    this.isOpenSource.next(false);
    document.body.classList.remove('modal-open');
  }
}
