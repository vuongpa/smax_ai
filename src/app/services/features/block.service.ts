import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { jsPlumb } from "jsplumb";
import { BlockComponent } from "src/app/pages/flow/components/block/block.component";
import { Block, Connection } from "src/app/stores";

@Injectable({ providedIn: "root" })
export class BlockService {
  rootViewContainer!: any;
  jsPlumbInstance = jsPlumb.getInstance();

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  createViewContainerRef(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicBlock(block: Block) {
    const factory = this.factoryResolver.resolveComponentFactory(BlockComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);

    component.instance.block = block;

    this.rootViewContainer.insert(component.hostView);
  }

  addConnection(connection: Connection) {
    this.jsPlumbInstance.connect({ uuids: connection.uuids });
  }
}
