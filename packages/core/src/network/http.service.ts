import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config';
import { ApiClientOptions, SdkMethod } from '../types';

axios.defaults.baseURL = API_BASE_URL;

export class ApiClient {
  private _axios: any;

  constructor(options: ApiClientOptions) {
    this.initAxios(options);
  }

  public callToSdkApi = async (method: SdkMethod) => {
    const methods = {
      flow: 'sdk/flow',
      jwt: 'sdk/jwt',
    };

    return await this.request({ method: 'get', url: methods[method] });
  };

  private request = (options: AxiosRequestConfig) =>
    new Promise((res, rej) => {
      this._axios
        .request(options)
        .then((response: any) => res(response.data))
        .catch((ex: any) => rej(ex.response.data));
    });

  private initAxios = (options: ApiClientOptions) => {
    const { applicationId, apiKey } = options;
    this._axios = axios.create({
      headers: {
        'X-API-KEY': apiKey,
        'X-APPLICATION-ID': applicationId,
      },
    });
  };
}