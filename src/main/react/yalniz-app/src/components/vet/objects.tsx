export class VetResponse {
  id=0
  name=""
  phone=""
  email=""
  address=""
  city=""
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