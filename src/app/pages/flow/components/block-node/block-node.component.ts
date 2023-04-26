import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlockNode, FlowStore } from 'src/app/stores';

@Component({
  selector: 'app-block-node',
  templateUrl: './block-node.component.html',
  styleUrls: ['./block-node.component.scss']
})
export class BlockNodeComponent implements AfterViewInit, OnChanges {
  @Input() block_node!: BlockNode;
  @Input() idx!: number;
  constructor(
    private readonly flowStore: FlowStore
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.idx)
  }

  ngAfterViewInit() {
    this.flowStore.createConnectionsForBlockNode(this.block_node.id);
  }
}
