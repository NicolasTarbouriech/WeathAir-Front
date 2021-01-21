import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumComponent implements OnInit, OnDestroy {

  constructor( ) {
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
  }
}
