export interface User {
  id: number;
  firstName: string;
  lastName: string;
  authToken?: string;
  email:string;
  username: string;
  roles: string[];
}
