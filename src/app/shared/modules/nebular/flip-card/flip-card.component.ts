import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent implements OnInit {
  @Input() accent = 'info';
  @Input() frontTemplate;
  @Input() backTemplate;
  @Input() frontHeaderTemplate;
  @Input() backHeaderTemplate;
  constructor() { }

  ngOnInit(): void {
  }

}
