import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faIconsX } from '../../font-awesome-icons/fa-icons';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...faIconsX);
  }
}
