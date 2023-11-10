import { AfterContentInit, ContentChild, Directive, Host, HostListener, inject, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SortDirective } from './sort.directive';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSort, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

@Directive({
  selector: '[sortBy]'
})
export class SortByDirective implements AfterContentInit{
  @Input() sortBy: string;
  @ContentChild(FaIconComponent, { static: true }) iconComponent: FaIconComponent;

  sortIcon: IconDefinition;
  sortAscIcon: IconDefinition;
  sortDescIcon: IconDefinition;

  constructor(@Host() private sort: SortDirective) {
    this.sort = sort;
    this.sortIcon = faSort;
    this.sortAscIcon = faSortAmountUp;
    this.sortDescIcon = faSortAmountDown;
  }

  ngAfterContentInit(): void {
    if (this.sort.predicate && this.sort.predicate !== '_score' && this.sort.predicate === this.sortBy) {
      this.updateIconDefinition(this.iconComponent, this.sort.ascending ? this.sortAscIcon : this.sortDescIcon);
      this.sort.activeIconComponent = this.iconComponent;
    }
  }

  @HostListener('click')
  onClick(): void {
    if (this.sort.predicate && this.sort.predicate !== '_score') {
      this.sort.sort(this.sortBy);
      this.updateIconDefinition(this.sort.activeIconComponent, this.sortIcon);
      this.updateIconDefinition(this.iconComponent, this.sort.ascending ? this.sortAscIcon : this.sortDescIcon);
      this.sort.activeIconComponent = this.iconComponent;
    }
  }

  private updateIconDefinition(iconComponent: FaIconComponent, icon: IconDefinition): void {
    if (!iconComponent) {
      return;
    }

    iconComponent.icon = icon.iconName;
    iconComponent.render();
  }
}
