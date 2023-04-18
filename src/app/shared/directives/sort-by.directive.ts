import { ContentChild, Directive, HostListener, inject, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SortDirective } from './sort.directive';

@Directive({
  selector: '[sortBy]'
})
export class SortByDirective {
  @Input() sortBy: string;
  @ContentChild(FaIconComponent, { static: true }) iconComponent: FaIconComponent;
  private readonly sort = inject(SortDirective);

  @HostListener('click')
  onClick(): void {
    if (this.sort.predicate && this.sort.predicate !== '_score') {
      this.sort.sort(this.sortBy);
    }
  }
}
