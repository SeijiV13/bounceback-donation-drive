import { Product } from './Product';
export interface DonorTicket {
  id: string;
  name: string;
  contactPerson: string;
  contactNumber: string;
  products: Product[];
}
