import { Component, Input } from '@angular/core';
import { Tag } from '../tag.model';

@Component({
  selector: 'rsc-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent {
  @Input() tag: Tag;

}
