import axios from 'axios';
import config from '../../config';

export class RequestService {
  static get(url: string, params = {}) {
    return axios.get(url, { ...this.getDefaultParams(), params });
  }

  static getDefaultParams() {
    return {
      timeout: config.constants.HTTP_REQUEST_TIMEOUT,
    };
  }
}
