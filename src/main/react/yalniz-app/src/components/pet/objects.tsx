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

export class PetSaveRequest {
  name: string = ''
  species: string = ''
  breed: string = ''
  gender: string = ''
  color: string = ''
  birthdate: string = ''
  ownerId: number = 0
}

export class PetUpdateRequest {
  id: number = -1
  name: string = ''
  species: string = ''
  breed: string = ''
  gender: string = ''
  color: string = ''
  birthdate: string = ''
  ownerId: number = 0
}