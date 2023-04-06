import { Component } from '@angular/core';
import { AuthService } from './user.service';
import { Subscription } from 'rxjs';
import { AuthResponse } from './auth.model';

@Component({
  selector: 'rsc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user_authenticated: Boolean = false;
  user_name: String = ""

  private subscription: Subscription;

  constructor(private authService: AuthService) { }


  ngOnInit() {
    this.authService.getAuthenticated();
    this.subscription = this.authService.authChangedEvent.subscribe((response: AuthResponse) => {
      this.user_authenticated = response.authorized;
      this.user_name = response.name;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
