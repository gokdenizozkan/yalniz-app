import {VaccinationResponse} from "@/components/vaccination/objects";

export class ReportResponse {
  id: number = 0;
  title: string = "";
  diagnosis: string = "";
  cost: number = 10.0;
  appointmentId: number = 0;
  appointmentDateTime: string = "YYYY-MM-DDTHH:MM:SS";
  vaccinations: VaccinationResponse[] = [];
}

export class ReportSaveRequest {
  title: string = "";
  diagnosis: string = "";
  cost: number = 0.0;
  appointmentId: number = 0;
}

export class ReportUpdateRequest {
  id: number = 0;
  title: string = "";
  diagnosis: string = "";
  cost: number = 10.0;
  appointmentId: number = 0;
}

export class ReportVaccinationAddRequest {
  reportId: number = 0;
  vaccinationId: number = 0;
}