import { Injectable } from '@angular/core'
import { env } from '../../env'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from '../user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthorizedHttpService {
  private BASE_SERVER_URI = env.SERVER_URI

  constructor (private http: HttpClient, private userService: UserService) {}

  public get (url: string, options?: any) {
    return this.http.get(this.BASE_SERVER_URI + url, {
      headers: this.authorizedHeader,
      ...options
    })
  }

  public post (url: string, data: any, options?: any) {
    return this.http.post(this.BASE_SERVER_URI + url, data, {
      headers: this.authorizedHeader,
      ...options
    })
  }

  public put (url: string, data: any, options?: any) {
    return this.http.put(this.BASE_SERVER_URI + url, data, {
      headers: this.authorizedHeader,
      ...options
    })
  }

  public delete (url: string, options?: any) {
    return this.http.delete(this.BASE_SERVER_URI + url, {
      headers: this.authorizedHeader,
      ...options
    })
  }

  private get authorizedHeader (): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders()

    return authHeaders.set('Authorization', `Bearer ${this.userService.token}`)
  }
}
