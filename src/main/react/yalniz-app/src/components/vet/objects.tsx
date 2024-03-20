import {WorkdayResponse} from "@/components/vet/workday/objects";

export class VetResponse {
  id=0
  name=""
  phone=""
  email=""
  address=""
  city=""
}

export class VetResponseWithWorkdays {
  id=0
  name=""
  phone=""
  email=""
  address=""
  city=""
  workdays= [new WorkdayResponse()]
}

export class VetSaveRequest {
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
}

export class VetUpdateRequest {
  id: number = 0;
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
}