import { Component } from '@angular/core';
import { Resource } from '../resource.model'
import { ResourcesService } from '../resources.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'rsc-resource-search-detail',
  templateUrl: './resource-search-detail.component.html',
  styleUrls: ['./resource-search-detail.component.css']
})
export class ResourceSearchDetailComponent {
  resource: Resource | undefined;
  nativeWindow: any;

  constructor(
    private resourceService: ResourcesService,
    private windowService: WindRefService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.resource = this.resourceService.getResource(params['id']);
        }
      );

    this.nativeWindow = this.windowService.getNativeWindow()
  }

  onView() {
    if (this.resource) {
      this.nativeWindow.open(
        this.resource.url
      );
    }
  }

}
