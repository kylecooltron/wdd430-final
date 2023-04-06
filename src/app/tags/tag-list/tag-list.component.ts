import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Tag } from '../tag.model';
import { TagsService } from '../tags.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rsc-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit, OnDestroy {

  tags: Tag[] = [];
  loading: boolean = false;

  private subscription: Subscription;

  constructor(private tagService: TagsService) { }

  ngOnInit() {
    this.loading = true;
    this.tagService.getTags();
    this.subscription = this.tagService.tagListChangedEvent.subscribe((tagsList: Tag[]) => {
      this.tags = tagsList;
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
