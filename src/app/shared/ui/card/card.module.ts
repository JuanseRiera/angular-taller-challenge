import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CardBodyDirective, CardTitleDirective } from './card.directives';



@NgModule({
  declarations: [CardComponent, CardTitleDirective, CardBodyDirective],
  exports: [CardComponent, CardTitleDirective, CardBodyDirective]
})
export class CardModule { }
