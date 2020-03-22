import { DonorTicket } from './../../../../shared/models/DonorTicket';
import { Component, OnInit, Input } from '@angular/core';
import { DonorTicketService } from 'src/app/core/services/donor-ticket.service';

@Component({
  selector: 'app-product-donation-history',
  templateUrl: './product-donation-history.component.html',
  styleUrls: ['./product-donation-history.component.scss']
})
export class ProductDonationHistoryComponent implements OnInit {
  @Input() donorTickets: DonorTicket[] = [];
  constructor(private donorService: DonorTicketService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.donorService.getAllDonorTicket().subscribe((data) => {
      this.donorTickets = data;
    });
  }

}
