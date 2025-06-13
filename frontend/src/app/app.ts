
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  title = 'Library Management System';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Validate session on app start
    this.authService.validateSession();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
