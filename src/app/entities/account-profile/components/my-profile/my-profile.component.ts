import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { TutorService } from '../../../tutor/tutor.service';
import { TutorModel } from '../../../tutor/model/tutor.model';
import { UserModel } from '../../../../shared/services/auth.service';
import { TokenStorageService } from '../../../../shared/services/token-storage.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-tutor-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    TranslateModule
  ],
  standalone: true
})
export class MyProfileComponent implements OnInit {
  user: UserModel;
  tutor: TutorModel;

  constructor(private readonly tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }
}
