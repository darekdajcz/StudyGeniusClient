import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-active-announcements',
  templateUrl: './active-announcement.component.html',
  styleUrls: ['./active-announcement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  standalone: true
})
export class ActiveAnnouncementComponent {
  addAnnouncement() {

  }
}
