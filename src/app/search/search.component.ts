import { Component } from '@angular/core';
import { Resource } from '../resources/resource.model';
@Component({
  selector: 'rsc-search',
  templateUrl: './search.component.html',
  styles: [],
  providers: []
})
export class SearchComponent {
  selectedResource: Resource;

  constructor() { }

  ngOnInit() {
  }
}
