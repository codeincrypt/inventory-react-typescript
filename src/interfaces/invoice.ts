export interface InputField {
  target: {
    name: string;
    value: string;
  };
}
export interface InputItems {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceData {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: { name: string; quantity: number; price: number; total: number }[];
  total: number;
}

export interface ErrorMessageInvoiceData {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  senderAddressstreet: string;
  senderAddresscity: string;
  senderAddresspostcode: string;
  senderAddresscountry: string;
  clientAddressstreet: string;
  clientAddresscity: string;
  clientAddresspostcode: string;
  clientAddresscountry: string;
  items: string;
}
