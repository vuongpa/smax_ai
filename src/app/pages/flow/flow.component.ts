import { Component } from '@angular/core';
import { FlowStore } from 'src/app/stores';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent {
  constructor(
    private readonly flowStore: FlowStore
  ) {}
}
