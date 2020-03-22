import { Component, OnInit, Input } from '@angular/core';
import { RequestorTicket } from 'src/app/shared/models/RequestorTicket';
import { RequestorTicketService } from 'src/app/core/services/requestor-ticket.service';

@Component({
  selector: 'app-product-request-history',
  templateUrl: './product-request-history.component.html',
  styleUrls: ['./product-request-history.component.scss']
})
export class ProductRequestHistoryComponent implements OnInit {
  @Input() requestorTickets: RequestorTicket[] = [];
  constructor(private requestorService: RequestorTicketService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.requestorService.getAllRequestorTicket().subscribe((data) => {
      this.requestorTickets = data;
   }); 
  }

}
