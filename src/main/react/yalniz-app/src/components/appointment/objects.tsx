export class AppointmentSaveRequest {
  start = "yyyy-MM-dd'T'HH:mm:ss"
  petId = 0
  vetId = 0
}

export class PetResponse {
  id: number = 0
  name: string = ''
  species: string = ''
  breed: string = ''
  gender: string = ''
  color: string = ''
  birthdate: string = Date.parse('2024-12-31').toString()
  ownerId: number = 0
}