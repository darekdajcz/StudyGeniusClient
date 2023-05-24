import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { UserModel } from '../../shared/services/auth.service';
import { TutorService } from '../tutor/tutor.service';
import { TutorModel } from '../tutor/model/tutor.model';
import { filter } from 'rxjs';
import { AuthRole } from '../login/components/models/auth-role';

@Component({
  selector: 'app-account-tutor-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountProfileComponent implements OnInit {
  user: UserModel;
  tutor: TutorModel;
  AuthRole = AuthRole

  constructor(private readonly tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }
}
