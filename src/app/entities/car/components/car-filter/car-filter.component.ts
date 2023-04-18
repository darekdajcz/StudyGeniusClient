import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { slideInAnimation } from '../../../../animations';
import { ChestType } from '../../model/car.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['../../../../../assets/scss/search.scss'],
  animations: slideInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarFilterComponent {

  @Input() carSearchForm!: FormGroup;
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
