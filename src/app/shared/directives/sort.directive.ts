import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Directive({
  selector: '[sort]'
})
export class SortDirective {
  @Input() predicate: string;
  @Input() ascending: boolean;
  @Input() callback: Function;

  @Output() predicateChange = new EventEmitter();
  @Output() ascendingChange = new EventEmitter();

  activeIconComponent: FaIconComponent;

  sort(field: string): void {

    if (field === this.predicate) {
      this.ascending = !this.ascending;
    }

    this.predicate = field;
    this.predicateChange.emit(field);
    this.ascendingChange.emit(this.ascending);
    this.callback();
  }
}
