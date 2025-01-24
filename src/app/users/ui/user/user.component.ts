import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../data-access/users.model';
import { CardModule } from '../../../shared/ui/card/card.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input({ required: true }) user!: User;
}
