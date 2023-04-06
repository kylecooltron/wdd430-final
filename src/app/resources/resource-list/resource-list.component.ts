import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Resource } from '../resource.model';
import { ResourcesService } from '../resources.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rsc-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit, OnDestroy {

  resources: Resource[] = [];
  loading: boolean = false;

  private subscription: Subscription;

  constructor(private resourceService: ResourcesService) { }

  ngOnInit() {
    this.loading = true;
    this.resourceService.getResources();
    this.subscription = this.resourceService.resourceListChangedEvent.subscribe((resourcesList: Resource[]) => {
      this.resources = resourcesList;
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
