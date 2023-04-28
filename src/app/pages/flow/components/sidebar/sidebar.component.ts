import { Component } from "@angular/core";

@Component({
  selector: "app--flow-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  tabs = {
    triggers: {
      name: "Triggers",
      iconUrl: "/assets/svgs/flow_trigger.svg",
      key: "triggers-nav"
    },
    blocks: {
      name: "Blocks",
      iconUrl: "/assets/svgs/flow_block.svg",
      key: "blocks-nav"
    }
  };
  active = this.tabs.blocks.key;
}
