
export interface RequestorTicket {
    id: string;
    name: string;
    address: string;
    contactPerson: string;
    contactNumber: string;
    products: {id: string, quantity: number}[];
    status: string;
}
