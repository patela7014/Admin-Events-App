import {Department} from "./department.models";
import {Location} from "./location.models";

export interface Team {
  teamId: number;
  title: string;
  description: string;
  department: Department;
  location: Location;
}
