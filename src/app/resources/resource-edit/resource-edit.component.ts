import { Component, OnInit } from '@angular/core';
import { Resource } from '../resource.model';
import { NgForm } from '@angular/forms';
import { ResourcesService } from '../resources.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TagsService } from 'src/app/tags/tags.service';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/tags/tag.model';

@Component({
  selector: 'rsc-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css']
})
export class ResourceEditComponent implements OnInit {

  originalResource: undefined | Resource;
  resource: undefined | Resource;
  editMode: boolean = false;
  id: string;
  // searching for tags
  term: string;
  loading: boolean = false;
  searchable_tags: Tag[] = [];
  tags: Tag[] = [];

  private subscription: Subscription;


  constructor(
    private resourceService: ResourcesService,
    private router: Router,
    private route: ActivatedRoute,
    private tagService: TagsService
  ) {
  }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id == null) {
          this.editMode = false;
          return;
        }
        this.originalResource = this.resourceService.getResource(this.id);
        if (this.originalResource == null) {
          this.editMode = false;
          return;
        }
        this.editMode = true;
        this.resource = structuredClone(this.originalResource);
        if (this.resource != null && this.resource.tags != null && this.resource.tags != undefined) {
          this.tags = JSON.parse(JSON.stringify(this.resource.tags));
        }
      })


    // load tags 
    this.loading = true;
    this.subscription = this.tagService.tagListChangedEvent.subscribe((tagList: Tag[]) => {
      this.searchable_tags = tagList;
      this.loading = false;
    })
    this.tagService.getTags();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSubmit(form: NgForm) {
    const value = form.value;
    const newResource = new Resource(
      value.id,
      value.name,
      value.description,
      value.url,
      this.tags,
    );
    console.log(newResource);
    if (this.editMode) {
      this.resourceService.updateResource(this.originalResource, newResource);
    } else {
      this.resourceService.addResource(newResource);
    }
    this.editMode = false;
    this.router.navigateByUrl('/resources');
  }


  onCancel() {
    this.router.navigateByUrl('/resources');
  }

  search(value: string) {
    this.term = value;
  }

  addTag(newTag: Tag) {
    if (!tagExistsInList(newTag, this.tags)) {
      this.tags.push(newTag);
    }
  }

  removeTag(removeTag: Tag) {
    const pos = this.tags.findIndex(d => d.id === removeTag.id);
    if (pos < 0) {
      return;
    }
    this.tags.splice(pos, 1);
  }

}

function tagExistsInList(tag: Tag, list: Tag[]) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === tag.id) {
      return true;
    }
  }
  return false;
}
