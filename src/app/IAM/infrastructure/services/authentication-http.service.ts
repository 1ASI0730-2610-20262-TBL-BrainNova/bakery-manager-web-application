import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignInRequestDto } from '../../application/dtos/sign-in.request.dto';
import { SignInResponseDto } from '../../application/dtos/sign-in.response.dto';
import { SignUpRequestDto } from '../../application/dtos/sign-up.request.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHttpService {

  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  signIn(request: SignInRequestDto): Observable<SignInResponseDto> {
    return this.http.post<SignInResponseDto>(
      `${this.baseUrl}/sign-in`,
      request,
      { headers: this.headers }
    );
  }

  signUp(request: SignUpRequestDto): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/sign-up`,
      request,
      { headers: this.headers }
    );
  }

  refreshToken(refreshToken: string): Observable<SignInResponseDto> {
    return this.http.post<SignInResponseDto>(
      `${this.baseUrl}/refresh-token`,
      { refreshToken },
      { headers: this.headers }
    );
  }
}
