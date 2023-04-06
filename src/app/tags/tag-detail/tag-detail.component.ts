import { Component } from '@angular/core';
import { Tag } from '../tag.model'
import { TagsService } from '../tags.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'rsc-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent {
  tag: Tag | undefined;
  nativeWindow: any;

  constructor(
    private tagService: TagsService,
    private windowService: WindRefService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.tag = this.tagService.getTag(params['id']);
        }
      );

    this.nativeWindow = this.windowService.getNativeWindow()
  }

  onDelete() {
    if (this.tag) {
      this.tagService.deleteTag(this.tag);
      this.router.navigate(['/tags']);
    }
  }


}
