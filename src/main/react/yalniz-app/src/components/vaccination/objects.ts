export class VaccinationResponse {
  id: number = 0;
  name: string = "";
  code: string = "";
  administrationDate: string = "YYYY-MM-DD"
  expirationDate: string = "YYYY-MM-DD"
  petId: number = 0;
  reportId: number = 0;
}

export class VaccinationSaveRequest {
  name: string = "";
  code: string = "";
  administrationDate: string = "YYYY-MM-DD"
  expirationDate: string = "YYYY-MM-DD"
  petId: number = 0;
  reportId: number = 0;
}

export class VaccinationUpdateRequest {
  id: number = 0;
  name: string = "";
  code: string = "";
  administrationDate: string = "YYYY-MM-DD"
  expirationDate: string = "YYYY-MM-DD"
  petId: number = 0;
  reportId: number = 0;
}