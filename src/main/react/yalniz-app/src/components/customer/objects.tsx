import {PetResponse} from "@/components/pet/objects";

export class CustomerSaveRequest {
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  city: string = '';
}

export class CustomerUpdateRequest {
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