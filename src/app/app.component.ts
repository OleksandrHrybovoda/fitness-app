import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from './auth/shared/services/auth/auth.service';
import { AppStateInterface } from './types/appState.interface';
import { getUserSelector } from './auth/store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user!: Observable<User | null>;
  subscription!: Subscription;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.authState.subscribe();
    this.user = this.store.pipe(select(getUserSelector));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onLogout() {
    await this.authService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
