import { Component, Input } from '@angular/core';
import { Tag } from '../tag.model';

@Component({
  selector: 'rsc-tag-search-item',
  templateUrl: './tag-search-item.component.html',
  styleUrls: ['./tag-search-item.component.css']
})
export class TagSearchItemComponent {
  @Input() tag: Tag;

}
