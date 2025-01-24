import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardModule } from '../card/card.module';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [CardModule],
  templateUrl: './card-skeleton.component.html',
  styleUrl: './card-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSkeletonComponent {

}
