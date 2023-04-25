import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "./base.service";
import { EntityResult } from "src/app/types/viewmodels";
import { AskResult } from "src/app/models";

@Injectable({providedIn: 'root'})
export class OpenAiService extends BaseApiService {
  constructor(
    private readonly http: HttpClient
  ) {
    super(http)
  }

  ask(prompt: string) {
    this.http.post<EntityResult<AskResult>>(this.createUrl(['ask']), {prompt});
  }
}
