import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    SharedModule,
    MatButtonModule,
    FontAwesomeModule,
    TranslateModule
  ],
  standalone: true
})
export class SortButtonComponent{
  @Input() predicate: string;
  @Input() ascending: boolean;
  @Input() sortButtonName: string;
}
