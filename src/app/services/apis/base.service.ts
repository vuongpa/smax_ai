import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class BaseApiService {
  private apiAddress = "http://localhost:3000";

  constructor(protected httpClient: HttpClient) {}

  protected createParams(params: { [key: string]: any }): HttpParams {
    return Object.keys(params).reduce((m, k) => {
      if (params[k] != null) {
        return m.set(k, params[k].toString());
      }
      return m;
    }, new HttpParams());
  }

  protected createUrl(paths: string[]) {
    const api = this.apiAddress + "/" + paths.join("/");
    return api.replace(/\/+$/, "");
  }

  public setApiAddress(apiAddress: string, endpoint: string) {
    this.apiAddress = apiAddress + "/" + endpoint;
    this.apiAddress = this.apiAddress.replace(/\/+$/, "");
  }
}
