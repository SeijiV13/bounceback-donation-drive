import { TestBed } from '@angular/core/testing';

import { RequestorTicketService } from './requestor-ticket.service';

describe('RequestorTicketService', () => {
  let service: RequestorTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestorTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
