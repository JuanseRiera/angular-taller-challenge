import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { UsersService } from '../data-access/users.service';
import { BehaviorSubject, switchMap, catchError, tap } from 'rxjs';
import { CardSkeletonComponent } from '../../shared/ui/card-skeleton/card-skeleton.component';
import { CardModule } from '../../shared/ui/card/card.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DebouncedInputComponent } from '../../shared/ui/debounced-input/debounced-input.component';
import { UserComponent } from '../ui/user/user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    CardSkeletonComponent,
    DebouncedInputComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UsersService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  private _usersService = inject(UsersService);

  searchedName$ = new BehaviorSubject('');
  users$ = this.searchedName$.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap((searchedName) => this._usersService.getUsers(searchedName)),
    catchError((error) => {
      //TODO: We could implement something like a toast to show some error message to the user
      console.error(error);
      return [];
    }),
    tap(() => this.isLoading.set(false)),
  );
  isLoading: WritableSignal<boolean> = signal(false);

  setSearchedName(searchedName: string) {
    this.searchedName$.next(searchedName);
  }
}
