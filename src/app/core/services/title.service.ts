import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title: Subject<string>;
  constructor() { }

  setTitleService(title) {
    this.title.next(title);
  }
}
