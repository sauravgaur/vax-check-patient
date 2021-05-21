import { Injectable } from '@angular/core';

@Injectable()
export class IdGeneratorService {
  public generate(): string {
    return `kt-${(Math.random()*0xFFFFFF <<0).toString(16)}`;
  }
}