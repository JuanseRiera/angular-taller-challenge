import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip, Subscription } from 'rxjs';

@Component({
  selector: 'app-debounced-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './debounced-input.component.html',
  styleUrl: './debounced-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebouncedInputComponent implements  OnChanges, OnDestroy {
  @Input() placeholder: string = '';
  @Input() debounceTime: number = 300;
  @Input() set disable(value: boolean) {
    if (value) {
      this.textControl.enable();
    } else {
      this.textControl.disable();
    }
  }
  @Output() debouncedText: EventEmitter<string> = new EventEmitter();
  textControl: FormControl = new FormControl();
  subscription?: Subscription;

  constructor() {
    this.createDebounceObservable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["debounceTime"]) {
      this.destroySubscription();
      this.createDebounceObservable();
    }
  }

  ngOnDestroy(): void {
    this.destroySubscription();
  }

  destroySubscription() {
    this.subscription?.unsubscribe();
  }

  createDebounceObservable() {
    this.subscription = this.textControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        skip(1) //We skip the first value since its going to emit the empty string only
      )
      .subscribe((res) => {
        this.debouncedText.emit(res || '');
      });
  }
}
