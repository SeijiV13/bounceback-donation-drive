import { TestBed } from '@angular/core/testing';

import { DonorTicketService } from './donor-ticket.service';

describe('DonorTicketService', () => {
  let service: DonorTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
