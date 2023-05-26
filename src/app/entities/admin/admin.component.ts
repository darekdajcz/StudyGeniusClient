import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AdminComponent implements OnInit {
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.forApprove().subscribe();
  }

}
