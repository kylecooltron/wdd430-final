import { Component } from '@angular/core';
import { Tag } from './tag.model';
@Component({
  selector: 'rsc-documents',
  templateUrl: './tags.component.html',
  styles: [],
  providers: []
})
export class TagsComponent {
  selectedTag: Tag;

  constructor() { }

  ngOnInit() {
  }
}
