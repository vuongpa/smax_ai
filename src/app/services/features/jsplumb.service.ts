import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { jsPlumb } from 'jsplumb';

import { BlockNodeComponent } from "src/app/pages/flow/components/block-node/block-node.component";

@Injectable({providedIn: 'root'})
export class JsPlumbService {
  private rootViewContainer!: any;
  readonly jsPlumbInstance = jsPlumb.getInstance();

  constructor(
    private factoryResolver: ComponentFactoryResolver,
  ) {}

  setRootViewContainerRef(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicNode(block_node: any, ref: any, index: number) {
    const factory = this.factoryResolver.resolveComponentFactory(BlockNodeComponent);
    const component = factory.create(ref?.parentInjector);

    component.instance.block_node = block_node;
    component.instance.idx = index;

    ref?.insert(component.hostView);
  }

  addConnection(connection: any) {
    this.jsPlumbInstance.connect({ uuids: connection.uuids });
  }

  public clear() {
    this.rootViewContainer?.clear();
  }
}
