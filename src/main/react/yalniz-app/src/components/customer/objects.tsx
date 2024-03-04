import { PetResponse } from "@/components/pet/objects";

export class CustomerSaveRequest {
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  city: string = '';
}

export class CustomerUpdateRequest {

  constructor(customer: any) {
    this.id = customer.id;
    this.name = customer.name;
    this.email = customer.email;
    this.phone = customer.phone;
    this.address = customer.address;
    this.city = customer.city;
  }

  id: number = 0;
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
}

export class CustomerResponse {
  id: number = 0;
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  city: string = '';
  pets: PetResponse[] = [];
}