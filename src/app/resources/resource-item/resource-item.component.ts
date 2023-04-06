import { Component, Input } from '@angular/core';
import { Resource } from '../resource.model';

@Component({
  selector: 'rsc-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css']
})
export class ResourceItemComponent {
  @Input() resource: Resource;

}
