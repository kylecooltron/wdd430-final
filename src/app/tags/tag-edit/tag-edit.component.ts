import { Component, OnInit } from '@angular/core';
import { Tag } from '../tag.model';
import { NgForm } from '@angular/forms';
import { TagsService } from '../tags.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'rsc-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {

  originalTag: undefined | Tag;
  tag: undefined | Tag;
  editMode: boolean = false;
  id: string;

  constructor(
    private tagService: TagsService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id == null) {
          this.editMode = false;
          return;
        }
        this.originalTag = this.tagService.getTag(this.id);
        if (this.originalTag == null) {
          this.editMode = false;
          return;
        }
        this.editMode = true;
        this.tag = structuredClone(this.originalTag);
      })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newTag = new Tag(
      value.id,
      value.name
    );
    if (this.editMode) {
      this.tagService.updateTag(this.originalTag, newTag);
    } else {
      this.tagService.addTag(newTag);
    }
    this.editMode = false;
    this.router.navigateByUrl('/tags');
  }


  onCancel() {
    this.router.navigateByUrl('/tags');
  }

}
