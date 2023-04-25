import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "./base.service";
import { AskResult } from "src/app/models";

@Injectable({providedIn: 'root'})
export class OpenAiService extends BaseApiService {
  constructor(
    private readonly http: HttpClient
  ) {
    super(http)
  }

  ask(prompt: string) {
    return this.http.post<AskResult>(this.createUrl(['ask']), {prompt});
  }
}
