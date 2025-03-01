export interface IRole {
  roleId: number;
  role: string;
}

export interface IDesignation {
  designationId: number;
  designation: string;
}

export interface IEmployee {
  empName: string;
  empId: number;
  empCode: string;
  empEmailId: string;
  empDesignation: string;
  role: string;
}

export interface IClientProject extends IEmployee {
  projectName: string;
  startDate: string;
  expectedEndDate: string;
  clientName: string;
  clientProjectId: number;
}

export interface IAPIResponse {
  message: string;
  result: boolean;
  data: any;
}
