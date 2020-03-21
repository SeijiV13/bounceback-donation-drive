import { Product } from './Product';
export interface RequestorTicket {
    id: string;
    name: string;
    address: string;
    contactPerson: string;
    contactNumber: string;
    products: Product[];
}