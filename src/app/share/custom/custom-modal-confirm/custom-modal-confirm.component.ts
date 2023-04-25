import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

export interface IModalConfirmContent {
  description: string;
  okText?: string;
  cancelText?: string;
  type?: 'warning' | 'info' | 'error';
}

@Component({
  selector: 'custom-modal-confirm',
  template: `
    <ng-template #template>
      <div class="custom-modal-confirm">
        <div class="modal-header">
          <h5 class="modal-title pull-left">Xác nhận</h5>
          <button
            type="button"
            class="btn-close close pull-right"
            aria-label="Close"
            (click)="hideModal()"
          >
            <span aria-hidden="true" class="visually-hidden">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <p>
            <span>
              <i
                class="fas fa-info-circle"
                style="color: #5288e5;"
              ></i>
            </span>
            {{ modalContent.description }}
          </p>
          <button
            type="button"
            class="btn btn-primary button-confirm"
            (click)="confirm()"
          >
            {{ modalContent.okText }}
          </button>
          <button type="button" class="btn btn-default" (click)="decline()">
            {{ modalContent.cancelText }}
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./custom-modal-confirm.component.scss'],
})
export class CustomModalConfirmComponent implements OnInit {
  @ViewChild('template') template: any;
  private destroy = new Subject();
  public modalRef?: BsModalRef;
  public modalContent: IModalConfirmContent = {
    description: '',
    okText: 'Ok',
    cancelText: 'Cancel',
    type: 'warning',
  };
  public okFunc?: Function;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(modalContent: IModalConfirmContent, okFunc?: Function) {
    this.modalContent = Object.assign(this.modalContent, modalContent);
    this.modalRef = this.modalService.show(this.template, {class: 'modal-sm'});
    this.okFunc = okFunc;
  }

  confirm(): void {
    this.okFunc?.();
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }

  hideModal() {
    this.modalRef?.hide();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
