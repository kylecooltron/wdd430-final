import { Component } from '@angular/core';
import { Resource } from '../resource.model'
import { ResourcesService } from '../resources.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'rsc-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent {
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

  onDelete() {
    if (this.resource) {
      this.resourceService.deleteResource(this.resource);
      this.router.navigate(['/resources']);
    }
  }


}
