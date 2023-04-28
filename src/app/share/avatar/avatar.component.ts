import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"]
})
export class AvatarComponent {
  @Input() avatarUrl = "assets/images/avatar-default.png";
  @Input() width = "49px";
  @Input() height = "49px";
  @Input() type: "rounded" | "square" = "rounded";
  @Input() backgroundColor = "rgba(37, 51, 98, 0.37)";

  @Output() onClick = new EventEmitter();

  handleClick(ev: MouseEvent) {
    this.onClick.emit(ev);
  }
}
