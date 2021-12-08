import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) {
  }

  getTeams() {
    return this.http.get<any>(this.baseUrl + `/teams`, this.httpOptions)
      .pipe(map(teams => {
        return teams;
      }));
  }
}
