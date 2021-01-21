import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerComponent implements OnInit, OnDestroy {

  constructor( ) {
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
  }
}
