import { Component } from '@angular/core';
import { Resource } from './resource.model';
@Component({
  selector: 'rsc-documents',
  templateUrl: './resources.component.html',
  styles: [],
  providers: []
})
export class ResourcesComponent {
  selectedResource: Resource;

  constructor() { }

  ngOnInit() {
  }
}
