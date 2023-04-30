import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { BlockService } from "~/app/services/features";
import { Block, BlockStore } from "~/app/stores";

@Component({
  selector: "app-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"]
})
export class BlockComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() block!: Block;
  connections$ = this.blockStore.connections$;
  showEditBtn = false;
  @ViewChild("node_map") nodeMapRef!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly blockStore: BlockStore,
    private readonly blockService: BlockService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.showEditBtn = this.block.active;
  }

  ngOnDestroy(): void {
    this.blockService.removeConnectionsOfBlock(this.block.id);
    this.blockService.removeNode(this.block.id);
  }

  ngAfterViewInit(): void {
    this.blockStore.insertBlockToMap(this.block);

    this.nodeMapRef.nativeElement.addEventListener("mouseenter", () => {
      this.showEditBtn = true;
    });
    this.nodeMapRef.nativeElement.addEventListener("mouseleave", () => {
      this.showEditBtn = this.block.active || false;
    });
  }

  openEditModal(content: TemplateRef<HTMLDivElement>) {
    this.modalService.open(content, { size: "xl" });
  }

  closeEditModal() {
    this.modalService.dismissAll();
  }
}
