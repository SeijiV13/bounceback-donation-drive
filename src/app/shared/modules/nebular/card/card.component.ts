import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() accent = 'info';
  @Input() headerTemplate;
  @Input() bodyTemplate;
  constructor() { }

  ngOnInit(): void {
  }

}
