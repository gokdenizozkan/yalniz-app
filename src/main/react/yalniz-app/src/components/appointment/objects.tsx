export class AppointmentSaveRequest {
  start = "yyyy-MM-dd'T'HH:mm:ss";
  petId = 0;
  vetId = 0;
}

export class AppointmentUpdateRequest {
  id = 0;
  start = "yyyy-MM-dd'T'HH:mm:ss";
  petId = 0;
  vetId = 0;
}

export class AppointmentResponse {
  id = 0;
  start = "yyyy-MM-dd'T'HH:mm:ss";
  end = "yyyy-MM-dd'T'HH:mm:ss";
  petId = 0;
  vetId = 0;
}