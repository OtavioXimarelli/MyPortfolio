import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dev-notice-modal',
  templateUrl: './dev-notice-modal.component.html',
  styleUrls: ['./dev-notice-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DevNoticeModalComponent implements OnInit {
  isOpen$: Observable<boolean>;
  
  constructor(private modalService: ModalService) {
    this.isOpen$ = this.modalService.isOpen$;
  }
  
  ngOnInit(): void {
    // Modal abre automaticamente na inicialização
    setTimeout(() => {
      this.modalService.open();
    }, 500);
  }

  @HostListener('document:keydown.escape')
  closeModal() {
    this.modalService.close();
  }
  
  closeWithBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.modalService.close();
    }
  }
}
