import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthRole } from '../../entities/login/components/models/auth-role';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Directive({
  selector: '[hasAuthority]'
})
export class HasAuthorityDirective {
  @Input('hasAuthority') set hasAuthority(authRole: AuthRole) {
    if (this.tokenStorageService.getUser().role === authRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
    private readonly tokenStorageService: TokenStorageService) {

  }

}
