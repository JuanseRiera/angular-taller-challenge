import { Directive } from '@angular/core';

@Directive({
  selector: '[card-header], [cardTitle]',
})
export class CardTitleDirective {}

@Directive({
  selector: `[card-body], [cardBody]`,
})
export class CardBodyDirective {}
