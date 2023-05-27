import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class AdminComponent implements OnInit {
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
  }
}
