import { HttpHeaders } from '@angular/common/http';

export class BaseService {

  constructor() {
  }

  /**
   * Gets the default HttpHeaders for API communication.
   */
  protected getDefaultHeaders(): object {
    return  new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Gets the default HttpOptions for API communication.
   */
  protected getDefaultHttpOptions(): object {
    return {
      headers: this.getDefaultHeaders()
    };
  }
}
