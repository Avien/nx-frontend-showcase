import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectorOption } from '@nx-frontend-showcase/connector-wizard/model';

@Injectable({ providedIn: 'root' })
export class WizardApiService {
  private readonly baseUrl = '/api/wizard';

  constructor(private http: HttpClient) {}

  init() {
    return this.http.post<{ wizardId: string }>(`${this.baseUrl}/init`, {});
  }

  getServices() {
    return this.http.get<ConnectorOption[]>(`${this.baseUrl}/services`);
  }

  saveService(serviceId: string) {
    return this.http.post<{ success: true }>(`${this.baseUrl}/service`, { serviceId });
  }

  authenticate(serviceId: string) {
    return this.http.post<{ authorized: boolean }>(`${this.baseUrl}/auth`, { serviceId });
  }

  getScopes(serviceId: string) {
    return this.http.get<string[]>(`${this.baseUrl}/scopes`, { params: { serviceId } });
  }

  finish(payload: { serviceId: string; scopes: string[] }) {
    return this.http.post<{ ok: true }>(`${this.baseUrl}/finish`, payload);
  }
}
