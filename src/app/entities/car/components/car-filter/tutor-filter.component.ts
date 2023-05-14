import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { slideInAnimation } from '../../../../animations';
import { ChestType } from '../../model/tutor.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tutor-filter',
  templateUrl: './tutor-filter.component.html',
  styleUrls: ['../../../../../assets/scss/search.scss'],
  animations: slideInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorFilterComponent {

  @Input() tutorSearchForm!: FormGroup;
  @Input() showSearchBox = false;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  chestType = Object.values(ChestType);

  resetV(): void {
    this.reset.emit();
  }

  closeV(): void {
    this.close.emit();
  }

  filter(): void  {
    this.search.emit();
  }
}
