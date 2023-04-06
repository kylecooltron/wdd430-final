import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Resource } from '../../resources/resource.model';
import { ResourcesService } from '../../resources/resources.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rsc-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit, OnDestroy {

  resources: Resource[] = [];
  loading: boolean = false;
  term: string;

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

  search(value: string) {

    this.term = value;

  }

}
