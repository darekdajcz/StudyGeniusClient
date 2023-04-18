import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[sort]'
})
export class SortDirective {
  @Input() predicate: string;
  @Input() ascending: boolean;
  @Input() callback: Function;

  @Output() predicateChange: EventEmitter<string> = new EventEmitter();
  @Output() ascendingChange: EventEmitter<boolean> = new EventEmitter();

  sort(field: string): void {

    if(field === this.predicate) {
      this.ascending = !this.ascending;
    }
    this.predicate = field;
    this.predicateChange.emit(field);
    this.ascendingChange.emit(this.ascending);
    this.callback();
  }
}
