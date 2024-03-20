export class WorkdaySaveRequest {
  vetId: number = 0;
  date: string | undefined = 'YYYY-MM-DD';
}

export class WorkdayUpdateRequest {
  id: number = 0;
  vetId: number = 0;
  date: string | undefined = 'YYYY-MM-DD';
}

export class WorkdayResponse {
  id: number = 0;
  vetId: number = 0;
  date: string = '';
}